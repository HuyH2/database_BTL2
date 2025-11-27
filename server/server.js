const dotenv = require('dotenv');
dotenv.config();

const { poolPromise } = require('./src/config/db');
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    console.log('Testing database connection...');
    await poolPromise;
    console.log('Database connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
};

start();
