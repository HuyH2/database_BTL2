const dotenv = require('dotenv');
dotenv.config();

const { connectDB } = require('./src/config/db');
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

console.log('connectDB type:', typeof connectDB);
console.log('connectDB function:', connectDB);

const start = async () => {
  try {
    console.log('About to call connectDB...');
    await connectDB();
    console.log('Database connected successfully');
  } catch (err) {
    console.warn('Database connection failed, starting server without DB:', err.message || err);
  }
  // Start server regardless of DB connectivity so frontend can be tested
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
