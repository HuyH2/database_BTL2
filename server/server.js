const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./src/config/db');   // <-- KHÔNG có { }
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

console.log('connectDB type:', typeof connectDB);
console.log('connectDB function:', connectDB);

const start = async () => {
  try {
    console.log('About to call connectDB...');
    await connectDB();
    console.log('Database connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
};

start();
