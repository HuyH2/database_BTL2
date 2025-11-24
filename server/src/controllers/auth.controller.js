const { getPool, sql } = require('../config/database');

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

    const pool = await getPool();
    
    // Kiểm tra email đã tồn tại chưa
    const checkEmailResult = await pool.request()
      .input('Email', sql.NVarChar, email)
      .query('SELECT UserID FROM USER_ACCOUNT WHERE Email = @Email');
    
    if (checkEmailResult.recordset.length > 0) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    // Insert user mới
    const result = await pool.request()
      .input('UserName', sql.NVarChar, userName)
      .input('Email', sql.NVarChar, email)
      .input('UserPassword', sql.NVarChar, password)
      .input('Gender', sql.Char, gender)
      .input('DateOfBirth', sql.Date, dateOfBirth)
      .input('UserAge', sql.Int, age)
      .input('Status', sql.NVarChar, 'Active')
      .input('OrganizationID', sql.Int, organizationId || null)
      .query(`
        INSERT INTO USER_ACCOUNT (UserName, Email, UserPassword, Gender, DateOfBirth, UserAge, Status, OrganizationID)
        VALUES (@UserName, @Email, @UserPassword, @Gender, @DateOfBirth, @UserAge, @Status, @OrganizationID);
        
        SELECT SCOPE_IDENTITY() as UserID;
      `);

    const newUserId = result.recordset[0].UserID;

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

    const pool = await getPool();
    
    const result = await pool.request()
      .input('Email', sql.NVarChar, email)
      .input('Password', sql.NVarChar, password)
      .query(`
        SELECT UserID, UserName, Email, Gender, DateOfBirth, Status, OrganizationID
        FROM USER_ACCOUNT 
        WHERE Email = @Email AND UserPassword = @Password
      `);

    if (result.recordset.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result.recordset[0];
    
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