const db = require('../config/db');

const register = async (req, res) => {
  try {
    const { userName, email, password, gender, dateOfBirth, organizationId } = req.body;
    
    // Validation
    if (!userName || !email || !password || !gender || !dateOfBirth) {
      return res.status(400).json({ 
        error: 'Missing required fields: userName, email, password, gender, dateOfBirth' 
      });
    }

    // Tính tuổi từ ngày sinh
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    const checkEmailRows = await db.query('SELECT UserID FROM USER_ACCOUNT WHERE Email = ?', [email])
    if (checkEmailRows.length > 0) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    // Insert user mới
    if (db.client === 'mysql') {
      const [ins] = await db.raw(`INSERT INTO USER_ACCOUNT (UserName, Email, UserPassword, Gender, DateOfBirth, UserAge, Status, OrganizationID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [userName, email, password, gender, dateOfBirth, age, 'Active', organizationId || null])
      const newUserId = ins && ins.insertId
      res.status(201).json({ message: 'User registered successfully', userId: newUserId })
      return
    }
    const rows = await db.query(`INSERT INTO USER_ACCOUNT (UserName, Email, UserPassword, Gender, DateOfBirth, UserAge, Status, OrganizationID) VALUES (?, ?, ?, ?, ?, ?, ?, ?); SELECT SCOPE_IDENTITY() as UserID`, [userName, email, password, gender, dateOfBirth, age, 'Active', organizationId || null])
    const newUserId = rows && rows[0] && rows[0].UserID

    res.status(201).json({ 
      message: 'User registered successfully',
      userId: newUserId 
    });

  } catch (error) {
    console.error('Register error:', error);
    
    // Handle SQL errors
    if (error.number === 2627) { // Unique constraint violation
      return res.status(409).json({ error: 'Email already exists' });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const rows = await db.query(`SELECT UserID, UserName, Email, Gender, DateOfBirth, Status, OrganizationID FROM USER_ACCOUNT WHERE Email = ? AND UserPassword = ?`, [email, password])
    if (!rows || rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = rows[0]
    
    if (user.Status !== 'Active') {
      return res.status(403).json({ error: 'Account is not active' });
    }

    res.json({
      message: 'Login successful',
      user: {
        id: user.UserID,
        name: user.UserName,
        email: user.Email,
        gender: user.Gender,
        dateOfBirth: user.DateOfBirth,
        organizationId: user.OrganizationID
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  register,
  login
};