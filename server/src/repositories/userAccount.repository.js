// server/src/repositories/userAccount.repository.js
// (đường dẫn tuỳ project, miễn là trùng với chỗ bạn require)

const sql = require('mssql');
const { poolPromise } = require('../config/db');

/**
 * Gọi dbo.usp_AddUserAccount để tạo USER_ACCOUNT
 * CHỈ truyền đúng 7 tham số như định nghĩa SP
 */
async function addUser(data) {
  const pool = await poolPromise;

  await pool.request()
    .input('UserName', sql.NVarChar, data.userName)
    .input('Email', sql.NVarChar, data.email)
    .input('UserPassword', sql.NVarChar, data.userPassword)
    .input('Gender', sql.Char, data.gender)
    .input('DateOfBirth', sql.Date, data.dateOfBirth)
    .input('Status', sql.NVarChar, data.status)
    .input('OrganizationID', sql.Int, data.organizationId ?? null)
    .execute('dbo.usp_AddUserAccount');     // SỬ DỤNG TÊN MỚI
}

/**
 * Dùng khi register xong cần lấy UserID
 */
async function findUserByEmail(email) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('Email', sql.NVarChar, email)
    .query(`
      SELECT TOP 1 *
      FROM USER_ACCOUNT
      WHERE Email = @Email
    `);
  return result.recordset[0];
}

/**
 * Dùng cho login
 */
async function findUserByEmailForLogin(email) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('Email', sql.NVarChar, email)
    .query(`
      SELECT *
      FROM USER_ACCOUNT
      WHERE Email = @Email
    `);
  return result.recordset[0];
}

/**
 * Lấy role dựa vào các bảng STUDENT / INSTRUCTOR / ADMIN
 */
async function findRoleByUserId(userId) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('UserID', sql.Int, userId)
    .query(`
      SELECT TOP 1 RoleName
      FROM (
        SELECT 'Student'   AS RoleName FROM STUDENT   WHERE UserID = @UserID
        UNION ALL
        SELECT 'Instructor'            FROM INSTRUCTOR WHERE UserID = @UserID
        UNION ALL
        SELECT 'Admin'                 FROM ADMIN      WHERE UserID = @UserID
      ) r
    `);

  return result.recordset[0]?.RoleName || null;
}

/**
 * Các hàm CRUD khác cho USER_ACCOUNT – dùng cho userAccount.service
 */
async function getAllUsers() {
  const pool = await poolPromise;
  const result = await pool.request()
    .query(`
      SELECT UserID, UserName, Email, Gender, DateOfBirth, Status, OrganizationID
      FROM USER_ACCOUNT
    `);
  return result.recordset;
}

async function getUserById(userId) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('UserID', sql.Int, userId)
    .query(`
      SELECT UserID, UserName, Email, Gender, DateOfBirth, Status, OrganizationID
      FROM USER_ACCOUNT
      WHERE UserID = @UserID
    `);
  return result.recordset;
}

/**
 * Gọi sp_UpdateUser – chú ý đủ 8 tham số
 */
async function updateUser(userId, data) {
  const pool = await poolPromise;
  await pool.request()
    .input('UserID', sql.Int, userId)
    .input('UserName', sql.NVarChar, data.userName)
    .input('Email', sql.NVarChar, data.email)
    .input('UserPassword', sql.NVarChar, data.userPassword)
    .input('Gender', sql.Char, data.gender)
    .input('DateOfBirth', sql.Date, data.dateOfBirth)
    .input('Status', sql.NVarChar, data.status)
    .input('OrganizationID', sql.Int, data.organizationId ?? null)
    .execute('sp_UpdateUser');
}

/**
 * Gọi sp_DeleteUser
 */
async function deleteUser(userId) {
  const pool = await poolPromise;
  await pool.request()
    .input('UserID', sql.Int, userId)
    .execute('sp_DeleteUser');
}

module.exports = {
  addUser,
  findUserByEmail,
  findUserByEmailForLogin,
  findRoleByUserId,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
