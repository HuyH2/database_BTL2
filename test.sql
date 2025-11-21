USE BTL2;
GO

/**************************************************************************
    2.2 — TEST TRIGGER
**************************************************************************/

PRINT '==================== TRIGGER TESTS START ====================';

--------------------------------------------------------------------
-- TEST TRIGGER 1 — User chỉ được có 1 role
--------------------------------------------------------------------
PRINT '--- TEST 1.1: Add Student Role OK ---';

INSERT INTO USER_ACCOUNT (UserName, Email, UserPassword, Gender, DateOfBirth, Status)
VALUES ('Role Test User 1', 'role_test1@mail.com', '123', 'M', '2000-01-01', 'Active');

DECLARE @UID1 INT = SCOPE_IDENTITY();

INSERT INTO STUDENT (UserID, Major, Education_Level)
VALUES (@UID1, 'IT', 'Undergraduate');


PRINT '--- TEST 1.2: Add Instructor Role for SAME User (Expect FAIL) ---';
BEGIN TRY
    INSERT INTO INSTRUCTOR (UserID, Expertise, Bio, Qualification)
    VALUES (@UID1, 'AI', 'Bio', 'MSc');
END TRY
BEGIN CATCH
    PRINT ERROR_MESSAGE();
END CATCH;


PRINT '--- TEST 1.3: Update Instructor.UserID → Existing Student (Expect FAIL) ---';

-- tạo instructor khác
INSERT INTO USER_ACCOUNT (UserName, Email, UserPassword, Gender, DateOfBirth, Status)
VALUES ('Role Test User 2', 'role_test2@mail.com', '123', 'F', '1999-05-05', 'Active');

DECLARE @UID2 INT = SCOPE_IDENTITY();

INSERT INTO INSTRUCTOR (UserID, Expertise, Bio, Qualification)
VALUES (@UID2, 'Cloud', 'Bio', 'Cert');

-- Update để gây lỗi
BEGIN TRY
    UPDATE INSTRUCTOR
    SET UserID = @UID1
    WHERE UserID = @UID2;
END TRY
BEGIN CATCH
    PRINT ERROR_MESSAGE();
END CATCH;


--------------------------------------------------------------------
-- TEST TRIGGER 2 — Tự động tính tuổi
--------------------------------------------------------------------
PRINT '--- TEST 2.1: Insert user = Age auto computed ---';

INSERT INTO USER_ACCOUNT (UserName, Email, UserPassword, Gender, DateOfBirth, Status)
VALUES ('Age Test 1', 'age1@mail.com', '123', 'M', '1990-10-10', 'Active');

SELECT UserName, DateOfBirth, UserAge
FROM USER_ACCOUNT
WHERE Email = 'age1@mail.com';


PRINT '--- TEST 2.2: Update DOB → Age changes automatically ---';

UPDATE USER_ACCOUNT
SET DateOfBirth = '2005-01-01'
WHERE Email = 'age1@mail.com';

SELECT UserName, DateOfBirth, UserAge
FROM USER_ACCOUNT
WHERE Email = 'age1@mail.com';


PRINT '==================== TRIGGER TESTS END ====================';
PRINT '';
PRINT '';

/**************************************************************************
    2.3 — TEST STORED PROCEDURES
**************************************************************************/

PRINT '==================== STORED PROCEDURE TESTS START ====================';

--------------------------------------------------------------------
-- SP 1 — sp_GetStudentsByMajor
--------------------------------------------------------------------
PRINT '--- SP TEST 1: Students with Major = Computer Science ---';
EXEC sp_GetStudentsByMajor @Major = 'Computer Science';

PRINT '--- SP TEST 2: Students with Major = UnknownMajor ---';
EXEC sp_GetStudentsByMajor @Major = 'UnknownMajor';


--------------------------------------------------------------------
-- SP 2 — sp_GetCourseStats
--------------------------------------------------------------------
PRINT '--- SP TEST 3: Course Stats (MinStudents = 1) ---';
EXEC sp_GetCourseStats @MinStudents = 1;

PRINT '--- SP TEST 4: Course Stats (MinStudents = 10) ---';
EXEC sp_GetCourseStats @MinStudents = 10;


PRINT '==================== STORED PROCEDURE TESTS END ====================';
PRINT '';
PRINT '';


/**************************************************************************
    2.4 — TEST FUNCTIONS
**************************************************************************/

PRINT '==================== FUNCTION TESTS START ====================';

--------------------------------------------------------------------
-- FUNCTION 1 — fn_TotalVideoHoursInCourse
--------------------------------------------------------------------
PRINT '--- FUNC TEST 1: Video hours of CourseID = 1 ---';
SELECT dbo.fn_TotalVideoHoursInCourse(1) AS Hours_Course_1;

PRINT '--- FUNC TEST 2: Invalid CourseID = -1 ---';
SELECT dbo.fn_TotalVideoHoursInCourse(-1) AS InvalidCourseHours;

PRINT '--- FUNC TEST 3: Course with no videos ---';
INSERT INTO COURSE (Name, Category, Language, Price, Duration, InstructorID)
VALUES ('Empty Course', 'Test', 'VN', 0, 5, 6);

DECLARE @NewCourse INT = SCOPE_IDENTITY();
SELECT dbo.fn_TotalVideoHoursInCourse(@NewCourse) AS EmptyCourseHours;


--------------------------------------------------------------------
-- FUNCTION 2 — fn_TotalQuizScore
--------------------------------------------------------------------
PRINT '--- FUNC TEST 4: Total quiz score for StudentID = 1 ---';
SELECT dbo.fn_TotalQuizScore(1) AS TotalQuizScore_Student1;

PRINT '--- FUNC TEST 5: Invalid StudentID = -1 ---';
SELECT dbo.fn_TotalQuizScore(-1) AS InvalidQuizScore;

PRINT '--- FUNC TEST 6: Student with no quiz results ---';
INSERT INTO USER_ACCOUNT (UserName, Email, UserPassword, Gender, DateOfBirth, Status)
VALUES ('NoQuiz Student', 'noquiz@mail.com', '123', 'F', '2002-01-01', 'Active');

DECLARE @SID_NOQUIZ INT = SCOPE_IDENTITY();
INSERT INTO STUDENT VALUES (@SID_NOQUIZ, 'IT', 'Undergrad');

SELECT dbo.fn_TotalQuizScore(@SID_NOQUIZ) AS NoQuizScore;


PRINT '==================== FUNCTION TESTS END ====================';

