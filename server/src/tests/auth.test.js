/**
 * Simple test file for Auth API
 * 
 * Usage:
 * node server/src/tests/auth.test.js
 * 
 * Or use with curl/Postman as shown in AUTH_API_DOCUMENTATION.md
 */

const http = require('http');

const BASE_URL = 'http://localhost:5000';

/**
 * Helper function to make HTTP requests
 */
function makeRequest(method, endpoint, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          body: data ? JSON.parse(data) : null
        });
      });
    });

    req.on('error', reject);
    
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

/**
 * Test Suite
 */
async function runTests() {
  console.log('🧪 Starting Auth API Tests...\n');
  
  try {
    // Test 1: Register with valid data
    console.log('✅ Test 1: Register with valid data');
    const testUser = {
      userName: 'Test User ' + Date.now(),
      email: 'test' + Date.now() + '@example.com',
      password: 'password123',
      gender: 'M',
      dateOfBirth: '1990-01-15'
    };
    
    let response = await makeRequest('POST', '/api/auth/register', testUser);
    console.log(`   Status: ${response.status}`);
    console.log(`   Response:`, JSON.stringify(response.body, null, 2));
    
    if (response.status !== 201) {
      throw new Error(`Expected 201, got ${response.status}`);
    }
    
    const userId = response.body.userId;
    console.log('   ✓ Registration successful\n');

    // Test 2: Login with valid credentials
    console.log('✅ Test 2: Login with valid credentials');
    response = await makeRequest('POST', '/api/auth/login', {
      email: testUser.email,
      password: testUser.password
    });
    console.log(`   Status: ${response.status}`);
    console.log(`   Response:`, JSON.stringify(response.body, null, 2));
    
    if (response.status !== 200) {
      throw new Error(`Expected 200, got ${response.status}`);
    }
    console.log('   ✓ Login successful\n');

    // Test 3: Login with wrong password
    console.log('✅ Test 3: Login with wrong password (should fail)');
    response = await makeRequest('POST', '/api/auth/login', {
      email: testUser.email,
      password: 'wrongpassword'
    });
    console.log(`   Status: ${response.status}`);
    console.log(`   Response:`, JSON.stringify(response.body, null, 2));
    
    if (response.status !== 401) {
      throw new Error(`Expected 401, got ${response.status}`);
    }
    console.log('   ✓ Correctly rejected wrong password\n');

    // Test 4: Register duplicate email
    console.log('✅ Test 4: Register duplicate email (should fail)');
    response = await makeRequest('POST', '/api/auth/register', {
      ...testUser,
      userName: 'Another Name'
    });
    console.log(`   Status: ${response.status}`);
    console.log(`   Response:`, JSON.stringify(response.body, null, 2));
    
    if (response.status !== 409) {
      throw new Error(`Expected 409, got ${response.status}`);
    }
    console.log('   ✓ Correctly rejected duplicate email\n');

    // Test 5: Register with invalid email
    console.log('✅ Test 5: Register with invalid email format (should fail)');
    response = await makeRequest('POST', '/api/auth/register', {
      ...testUser,
      email: 'invalidemail'
    });
    console.log(`   Status: ${response.status}`);
    console.log(`   Response:`, JSON.stringify(response.body, null, 2));
    
    if (response.status !== 400) {
      throw new Error(`Expected 400, got ${response.status}`);
    }
    console.log('   ✓ Correctly rejected invalid email\n');

    // Test 6: Register with short password
    console.log('✅ Test 6: Register with short password (should fail)');
    response = await makeRequest('POST', '/api/auth/register', {
      ...testUser,
      email: 'test' + Date.now() + '2@example.com',
      password: '123'
    });
    console.log(`   Status: ${response.status}`);
    console.log(`   Response:`, JSON.stringify(response.body, null, 2));
    
    if (response.status !== 400) {
      throw new Error(`Expected 400, got ${response.status}`);
    }
    console.log('   ✓ Correctly rejected short password\n');

    // Test 7: Register with invalid gender
    console.log('✅ Test 7: Register with invalid gender (should fail)');
    response = await makeRequest('POST', '/api/auth/register', {
      ...testUser,
      email: 'test' + Date.now() + '3@example.com',
      gender: 'X'
    });
    console.log(`   Status: ${response.status}`);
    console.log(`   Response:`, JSON.stringify(response.body, null, 2));
    
    if (response.status !== 400) {
      throw new Error(`Expected 400, got ${response.status}`);
    }
    console.log('   ✓ Correctly rejected invalid gender\n');

    // Test 8: Register missing required fields
    console.log('✅ Test 8: Register missing required fields (should fail)');
    response = await makeRequest('POST', '/api/auth/register', {
      userName: 'Test',
      email: 'test@example.com'
      // Missing password, gender, dateOfBirth
    });
    console.log(`   Status: ${response.status}`);
    console.log(`   Response:`, JSON.stringify(response.body, null, 2));
    
    if (response.status !== 400) {
      throw new Error(`Expected 400, got ${response.status}`);
    }
    console.log('   ✓ Correctly rejected missing fields\n');

    console.log('\n✨ All tests passed!\n');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run tests
runTests();
