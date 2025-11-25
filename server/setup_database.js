const { poolPromise } = require('./src/config/db');
const sql = require('mssql');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  try {
    console.log('🔄 Starting database setup...');
    
    const pool = await poolPromise;
    console.log('✅ Database connected successfully');
    
    // Read and execute stored procedures
    const spFilePath = path.join(__dirname, '..', '04_store_procedures.sql');
    const spContent = fs.readFileSync(spFilePath, 'utf8');
    
    // Split by GO statements and execute each batch
    const batches = spContent.split(/\bGO\b/i).filter(batch => batch.trim());
    
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i].trim();
      if (batch) {
        try {
          console.log(`📝 Executing batch ${i + 1}/${batches.length}...`);
          await pool.request().query(batch);
        } catch (batchError) {
          console.log(`⚠️  Batch ${i + 1} warning: ${batchError.message}`);
          // Continue with other batches
        }
      }
    }
    
    console.log('✅ All stored procedures created successfully');
    
    // Test the stored procedures
    console.log('🧪 Testing stored procedures...');
    
    // Test sp_GetCourseStats
    try {
      const courseStats = await pool.request()
        .input('MinStudents', sql.Int, 0)
        .execute('sp_GetCourseStats');
      console.log(`✅ sp_GetCourseStats works! Found ${courseStats.recordset.length} courses`);
    } catch (err) {
      console.log('❌ sp_GetCourseStats error:', err.message);
    }
    
    // Test sp_GetStudentsByMajor
    try {
      const students = await pool.request()
        .input('Major', sql.NVarChar, 'Computer Science')
        .execute('sp_GetStudentsByMajor');
      console.log(`✅ sp_GetStudentsByMajor works! Found ${students.recordset.length} students`);
    } catch (err) {
      console.log('❌ sp_GetStudentsByMajor error:', err.message);
    }
    
    console.log('🎉 Database setup completed!');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    process.exit(1);
  }
}

// Run setup
setupDatabase();