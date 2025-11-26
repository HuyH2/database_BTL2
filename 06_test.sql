USE BTL2;
GO

--------------------------------------------------------------------
-- CLEAN OLD TEST DATA
--------------------------------------------------------------------
DELETE FROM USER_ACCOUNT WHERE UserID > 15;
DELETE FROM STUDENT WHERE UserID > 15;
DELETE FROM INSTRUCTOR WHERE UserID > 15;
DELETE FROM ADMIN WHERE UserID > 15;
DELETE FROM USER_ACCOUNT WHERE Email LIKE '%role_test%';
DELETE FROM USER_ACCOUNT WHERE Email LIKE '%age1%';
DELETE FROM USER_ACCOUNT WHERE Email LIKE '%noquiz%';
GO

/**************************************************************************
    2.1 — CRUD
**************************************************************************/

PRINT '--- TEST 1: AddUser hợp lệ ---';
BEGIN TRY
    EXEC dbo.usp_AddUser 
        @UserName = 'TestUser1',
        @Email = 'testuser1@mail.com',
        @UserPassword = '123',
        @Gender = 'M',
        @DateOfBirth = '2000-01-01',
        @Status = 'Active',
        @OrganizationID = 1;
    PRINT 'PASSED: User thêm thành công.';
END TRY
BEGIN CATCH
    PRINT 'FAILED: ';
    PRINT ERROR_MESSAGE();
END CATCH;
PRINT '---------------------------------------------';


PRINT '--- TEST 2: Email sai định dạng ---';
BEGIN TRY
    EXEC usp_AddUser
        'BadEmail', 'email-sai-dinh-dang', '123', 'M', '2000-01-01', 'Active', 1;
    PRINT 'FAILED: Trigger không bắt sai email!';
END TRY
BEGIN CATCH
    PRINT 'PASSED: ';
    PRINT ERROR_MESSAGE();
END CATCH;
PRINT '---------------------------------------------';


PRINT '--- TEST 3: Email trùng ---';
BEGIN TRY
    EXEC usp_AddUser
        'AnotherUser', 'testuser4@mail.com', '123', 'M', '2000-01-01', 'Active', 1;
    PRINT 'FAILED: Email trùng!';
END TRY
BEGIN CATCH
    PRINT 'PASSED: ';
    PRINT ERROR_MESSAGE();
END CATCH;
PRINT '---------------------------------------------';


PRINT '--- TEST 4: Gender sai ---';
BEGIN TRY
    EXEC usp_AddUser 
        'TestUser2', 'test2@mail.com', '123', 'X', '2000-01-01', 'Active', 1;
    PRINT 'FAILED: Gender sai mà không bị bắt!';
END TRY
BEGIN CATCH
    PRINT 'PASSED: ';
    PRINT ERROR_MESSAGE();
END CATCH;
PRINT '---------------------------------------------';


PRINT '--- TEST 5: DOB tương lai ---';
BEGIN TRY
    EXEC usp_AddUser
        'FutureUser', 'future@mail.com', '123', 'M', '3000-01-01', 'Active', 1;
    PRINT 'FAILED: DOB sai mà không bị bắt!';
END TRY
BEGIN CATCH
    PRINT 'PASSED: ';
    PRINT ERROR_MESSAGE();
END CATCH;
PRINT '---------------------------------------------';


PRINT '--- TEST 6: OrganizationID không tồn tại ---';
BEGIN TRY
    EXEC usp_AddUser
        'BadOrgUser', 'badorg@mail.com', '123', 'M', '2000-01-01', 'Active', 9999;
    PRINT 'FAILED: OrgID sai mà không bị bắt!';
END TRY
BEGIN CATCH
    PRINT 'PASSED: ';
    PRINT ERROR_MESSAGE();
END CATCH;
PRINT '---------------------------------------------';


--TEST CASE cho usp_UpdateUser
PRINT '--- TEST UPDATE 1: UserID không tồn tại ---';
BEGIN TRY
    EXEC usp_UpdateUser 999,
        'Name', 'new@mail.com', '123', 'M', '2000-01-01', 'Active', 1;
    PRINT 'FAILED: Không tồn tại mà không báo lỗi!';
END TRY
BEGIN CATCH
    PRINT 'PASSED: ';
    PRINT ERROR_MESSAGE();
END CATCH;
PRINT '---------------------------------------------';


PRINT '--- TEST UPDATE 2: Email trùng user khác ---';
BEGIN TRY
    EXEC usp_UpdateUser 1,
        'Test', 'testuser1@mail.com', '123', 'M', '2000-01-01', 'Active', 1;
    PRINT 'FAILED: Email trùng không bị chặn!';
END TRY
BEGIN CATCH
    PRINT 'PASSED: ';
    PRINT ERROR_MESSAGE();
END CATCH;
PRINT '---------------------------------------------';


PRINT '--- TEST UPDATE 3: Gender sai ---';
BEGIN TRY
    EXEC usp_UpdateUser 1,
        'Test', 'testupdate@mail.com', '123', 'X', '2000-01-01', 'Active', 1;
    PRINT 'FAILED: Gender sai không bị bắt!';
END TRY
BEGIN CATCH
    PRINT 'PASSED';
    PRINT ERROR_MESSAGE();
END CATCH;
PRINT '---------------------------------------------';


PRINT '--- TEST UPDATE 4: DOB tương lai ---';
BEGIN TRY
    EXEC usp_UpdateUser 1,
        'Test', 'testupdate@mail.com', '123', 'M', '3000-01-01', 'Active', 1;
    PRINT 'FAILED: DOB tương lai không bị bắt!';
END TRY
BEGIN CATCH
    PRINT 'PASSED';
    PRINT ERROR_MESSAGE();
END CATCH;
PRINT '---------------------------------------------';


PRINT '--- TEST UPDATE 5: Update hợp lệ ---';
BEGIN TRY
    EXEC usp_UpdateUser 1,
        'Updated User', 'updated@mail.com', 'newpass', 'F', '1999-01-01', 'Inactive', 1;
    PRINT 'PASSED: Update thành công!';
END TRY
BEGIN CATCH
    PRINT 'FAILED';
    PRINT ERROR_MESSAGE();
END CATCH;
PRINT '---------------------------------------------';


--TEST CASE cho usp_DeleteUser
PRINT '--- TEST DELETE 1: UserID không tồn tại ---';
BEGIN TRY
    EXEC usp_DeleteUser 999;
    PRINT 'FAILED: User không tồn tại mà không báo lỗi!';
END TRY
BEGIN CATCH
    PRINT 'PASSED';
    PRINT ERROR_MESSAGE();
END CATCH;
PRINT '---------------------------------------------';


PRINT '--- TEST DELETE 2: User là Student ---';
BEGIN TRY
    EXEC usp_DeleteUser 1;   -- UserID 1 là Student
    PRINT 'FAILED: Student mà vẫn delete được!';
END TRY
BEGIN CATCH
    PRINT 'PASSED';
    PRINT ERROR_MESSAGE();
END CATCH;
PRINT '---------------------------------------------';


PRINT '--- TEST DELETE 3: User là Instructor ---';
BEGIN TRY
    EXEC usp_DeleteUser 6;
    PRINT 'FAILED: Instructor mà vẫn delete được!';
END TRY
BEGIN CATCH
    PRINT 'PASSED';
    PRINT ERROR_MESSAGE();
END CATCH;
PRINT '---------------------------------------------';


PRINT '--- TEST DELETE 4: User là Admin ---';
BEGIN TRY
    EXEC usp_DeleteUser 11;
    PRINT 'FAILED: Admin mà vẫn delete được!';
END TRY
BEGIN CATCH
    PRINT 'PASSED';
    PRINT ERROR_MESSAGE();
END CATCH;
PRINT '---------------------------------------------';


PRINT '--- TEST DELETE 5: User có POST ---';
BEGIN TRY
    EXEC usp_DeleteUser 1;  -- AuthorID = 1 có post
    PRINT 'FAILED: Có POST mà vẫn delete!';
END TRY
BEGIN CATCH
    PRINT 'PASSED';
    PRINT ERROR_MESSAGE();
END CATCH;
PRINT '---------------------------------------------';


PRINT '--- TEST DELETE 6: User tạo FORUM ---';
BEGIN TRY
    EXEC usp_DeleteUser 6;   -- CreatorID = 6
    PRINT 'FAILED: Creator mà vẫn delete!';
END TRY
BEGIN CATCH
    PRINT 'PASSED';
    PRINT ERROR_MESSAGE();
END CATCH;
PRINT '---------------------------------------------';


    PRINT '--- TEST DELETE 7: User là MODERATOR ---';
BEGIN TRY
    EXEC usp_DeleteUser 11;
    PRINT 'FAILED: Moderator mà vẫn delete!';
END TRY
BEGIN CATCH
    PRINT 'PASSED';
    PRINT ERROR_MESSAGE();
END CATCH;
PRINT '---------------------------------------------';


EXEC dbo.usp_AddUser 
    'DeleteMe', 'deleteme@mail.com', '123', 'M', '2000-01-01', 'Active', NULL;
SELECT * FROM USER_ACCOUNT WHERE Email = 'deleteme@mail.com';

PRINT '--- TEST DELETE 8: Xóa user hợp lệ ---';
BEGIN TRY
    EXEC dbo.usp_DeleteUser 16;
    PRINT 'PASSED: Xóa thành công!';
END TRY
BEGIN CATCH
    PRINT 'FAILED';
    PRINT ERROR_MESSAGE();
END CATCH;
PRINT '---------------------------------------------';



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
-- FUNCTION 1 — fn_CountVideosInCourse
--------------------------------------------------------------------
PRINT '--- FUNC TEST 1: Count videos of CourseID = 1 ---';
SELECT dbo.fn_CountVideosInCourse(1) AS TotalVideos_Course1;


PRINT '--- FUNC TEST 2: Invalid CourseID = -1 (Expect -1) ---';
SELECT dbo.fn_CountVideosInCourse(-1) AS InvalidVideoCount;


PRINT '--- FUNC TEST 3: Course with no videos ---';

-- Tạo course trống để test
INSERT INTO COURSE (Name, Category, Language, Price, Duration, InstructorID)
VALUES ('Empty Course 2', 'TestCourse', 'EN', 0, 1, 6);

DECLARE @EmptyCourseID INT = SCOPE_IDENTITY();

SELECT dbo.fn_CountVideosInCourse(@EmptyCourseID) AS TotalVideos_EmptyCourse;



--------------------------------------------------------------------
-- FUNCTION 2 — fn_TotalVideoHoursInCourse
--------------------------------------------------------------------
PRINT '--- FUNC TEST 4: Total video hours of CourseID = 1 ---';
SELECT dbo.fn_TotalVideoHoursInCourse(1) AS Hours_Course1;


PRINT '--- FUNC TEST 5: Invalid CourseID = -1 (Expect -1) ---';
SELECT dbo.fn_TotalVideoHoursInCourse(-1) AS InvalidHours;


PRINT '--- FUNC TEST 6: Total hours for Course with NO videos ---';
SELECT dbo.fn_TotalVideoHoursInCourse(@EmptyCourseID) AS Hours_EmptyCourse;


PRINT '==================== FUNCTION TESTS END ====================';
GO