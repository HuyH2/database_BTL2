/**
 * Test file for the auth registration endpoint
 * This shows example usage and expected responses
 */

// Example 1: Student Registration
const studentRegistrationExample = {
  method: 'POST',
  url: '/api/auth/register',
  body: {
    userName: "John Doe",
    email: "john.doe@example.com", 
    password: "securepassword123",
    gender: "M",
    dateOfBirth: "2000-05-15",
    role: "Student"
  },
  expectedResponse: {
    status: 201,
    body: {
      message: "Register success",
      userId: 123,
      role: "Student"
    }
  }
};

// Example 2: Instructor Registration
const instructorRegistrationExample = {
  method: 'POST',
  url: '/api/auth/register',
  body: {
    userName: "Prof. Jane Smith",
    email: "jane.smith@university.edu",
    password: "teacherpass456", 
    gender: "F",
    dateOfBirth: "1985-08-20",
    role: "Instructor"
  },
  expectedResponse: {
    status: 201,
    body: {
      message: "Register success",
      userId: 124,
      role: "Instructor"
    }
  }
};

// Example 3: Admin Registration
const adminRegistrationExample = {
  method: 'POST',
  url: '/api/auth/register',
  body: {
    userName: "Admin User",
    email: "admin@system.com",
    password: "adminpass789",
    gender: "M", 
    dateOfBirth: "1990-01-01",
    role: "Admin"
  },
  expectedResponse: {
    status: 201,
    body: {
      message: "Register success", 
      userId: 125,
      role: "Admin"
    }
  }
};

// Error Cases
const errorExamples = [
  {
    description: "Missing required field",
    body: {
      userName: "Test User",
      // email missing
      password: "password123",
      role: "Student"
    },
    expectedResponse: {
      status: 400,
      body: { message: "email is required" }
    }
  },
  {
    description: "Duplicate email", 
    body: {
      userName: "Another User",
      email: "john.doe@example.com", // already exists
      password: "password123",
      role: "Student"
    },
    expectedResponse: {
      status: 409,
      body: { message: "Email already exists" }
    }
  },
  {
    description: "Invalid role",
    body: {
      userName: "Test User",
      email: "test@example.com",
      password: "password123", 
      role: "InvalidRole"
    },
    expectedResponse: {
      status: 400,
      body: { message: "Role must be Student, Instructor, or Admin" }
    }
  }
];

console.log('Auth Registration API Examples:');
console.log('Success Cases:', { studentRegistrationExample, instructorRegistrationExample, adminRegistrationExample });
console.log('Error Cases:', errorExamples);

module.exports = {
  studentRegistrationExample,
  instructorRegistrationExample, 
  adminRegistrationExample,
  errorExamples
};