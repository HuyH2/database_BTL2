/**
 * Simple test examples for the auth registration endpoint
 */

// Example request body for Student registration
const studentRequest = {
  userName: "John Student",
  email: "john@student.com",
  password: "password123",
  role: "Student"
};

// Example request body for Instructor registration  
const instructorRequest = {
  userName: "Jane Instructor",
  email: "jane@instructor.com", 
  password: "teacher456",
  role: "Instructor"
};

// Example request body for Admin registration
const adminRequest = {
  userName: "Admin User",
  email: "admin@system.com",
  password: "admin789", 
  role: "Admin"
};

// Test with optional fields
const fullRequest = {
  userName: "Full User",
  email: "full@example.com",
  password: "password123",
  gender: "M",
  dateOfBirth: "1995-06-15",
  role: "Student",
  organizationId: 1
};

// Error cases
const errorCases = [
  {
    description: "Missing userName",
    data: {
      email: "test@example.com",
      password: "password123", 
      role: "Student"
    },
    expectedStatus: 400,
    expectedMessage: "userName is required"
  },
  {
    description: "Missing email", 
    data: {
      userName: "Test User",
      password: "password123",
      role: "Student"
    },
    expectedStatus: 400,
    expectedMessage: "email is required"
  },
  {
    description: "Missing password",
    data: {
      userName: "Test User",
      email: "test@example.com", 
      role: "Student"
    },
    expectedStatus: 400,
    expectedMessage: "password is required"
  },
  {
    description: "Missing role",
    data: {
      userName: "Test User",
      email: "test@example.com",
      password: "password123"
    },
    expectedStatus: 400,
    expectedMessage: "role is required"
  },
  {
    description: "Invalid role", 
    data: {
      userName: "Test User",
      email: "test@example.com",
      password: "password123",
      role: "InvalidRole"
    },
    expectedStatus: 400,
    expectedMessage: "role is required"
  },
  {
    description: "Duplicate email",
    data: {
      userName: "Another User", 
      email: "john@student.com", // Already registered above
      password: "password123",
      role: "Student"
    },
    expectedStatus: 409,
    expectedMessage: "Email already exists"
  }
];

console.log('Test Cases:');
console.log('Success:', { studentRequest, instructorRequest, adminRequest, fullRequest });
console.log('Errors:', errorCases);

module.exports = {
  studentRequest,
  instructorRequest, 
  adminRequest,
  fullRequest,
  errorCases
};