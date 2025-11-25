USE BTL2;
Go

CREATE OR ALTER PROCEDURE dbo.usp_AddUserAccount
    @UserName NVARCHAR(100),
    @Email NVARCHAR(100),
    @UserPassword NVARCHAR(100),
    @Gender CHAR(1),
    @DateOfBirth DATE,
    @Status NVARCHAR(50),
    @OrganizationID INT = NULL
AS
BEGIN
    -- 1. Validate Email Format
    IF (@Email NOT LIKE '%@%.%')
    BEGIN
        RAISERROR('Invalid email format! Format should be like: name@gmail.com', 16, 1);
        RETURN;
    END

    -- 2. Validate Email duplicate
    IF EXISTS (SELECT 1 FROM USER_ACCOUNT WHERE Email = @Email)
    BEGIN
        RAISERROR('Email already exists in the system!', 16, 1);
        RETURN;
    END

    -- 3. Validate Gender
    IF (@Gender NOT IN ('M','F'))
    BEGIN
        RAISERROR('Gender must be M or F!', 16, 1);
        RETURN;
    END

    -- 4. Validate DateOfBirth
    IF (@DateOfBirth >= GETDATE())
    BEGIN
        RAISERROR('Date of birth must be less than current date!', 16, 1);
        RETURN;
    END

    -- 5. Validate OrganizationID (if provided)
    IF (@OrganizationID IS NOT NULL AND 
        NOT EXISTS (SELECT 1 FROM ORGANIZATION WHERE OrganizationID = @OrganizationID))
    BEGIN
        RAISERROR('OrganizationID does not exist!', 16, 1);
        RETURN;
    END

    -- INSERT USER
    INSERT INTO USER_ACCOUNT (UserName, Email, UserPassword, Gender, DateOfBirth, UserAge, Status, OrganizationID)
    VALUES (
        @UserName, @Email, @UserPassword, @Gender, 
        @DateOfBirth, DATEDIFF(YEAR, @DateOfBirth, GETDATE()), 
        @Status, @OrganizationID
    );

    PRINT 'User added successfully!';
END;
GO


CREATE OR ALTER PROCEDURE dbo.usp_UpdateUserAccount
    @UserID INT,
    @UserName NVARCHAR(100),
    @Email NVARCHAR(100),
    @UserPassword NVARCHAR(100),
    @Gender CHAR(1),
    @DateOfBirth DATE,
    @Status NVARCHAR(50),
    @OrganizationID INT = NULL
AS
BEGIN
    -- 1. Validate user exists
    IF NOT EXISTS (SELECT 1 FROM USER_ACCOUNT WHERE UserID = @UserID)
    BEGIN
        RAISERROR('UserID does not exist!', 16, 1);
        RETURN;
    END

    -- 2. Validate Email Format
    IF (@Email NOT LIKE '%@%.%')
    BEGIN
        RAISERROR('Invalid email format!', 16, 1);
        RETURN;
    END

    -- 3. Email duplicate check (not from the same User)
    IF EXISTS (SELECT 1 FROM USER_ACCOUNT WHERE Email = @Email AND UserID <> @UserID)
    BEGIN
        RAISERROR('Email already belongs to another user!', 16, 1);
        RETURN;
    END

    -- 4. Validate Gender
    IF (@Gender NOT IN ('M','F'))
    BEGIN
        RAISERROR('Gender must be M or F!', 16, 1);
        RETURN;
    END

    -- 5. Validate DOB
    IF (@DateOfBirth >= GETDATE())
    BEGIN
        RAISERROR('Date of birth must be less than current date!', 16, 1);
        RETURN;
    END

    -- 6. Validate Organization
    IF (@OrganizationID IS NOT NULL AND 
        NOT EXISTS (SELECT 1 FROM ORGANIZATION WHERE OrganizationID = @OrganizationID))
    BEGIN
        RAISERROR('OrganizationID does not exist!', 16, 1);
        RETURN;
    END

    -- UPDATE USER
    UPDATE USER_ACCOUNT
    SET UserName = @UserName,
        Email = @Email,
        UserPassword = @UserPassword,
        Gender = @Gender,
        DateOfBirth = @DateOfBirth,
        UserAge = DATEDIFF(YEAR, @DateOfBirth, GETDATE()),
        Status = @Status,
        OrganizationID = @OrganizationID
    WHERE UserID = @UserID;

    PRINT 'User updated successfully!';
END;
GO

CREATE OR ALTER PROCEDURE sp_UpdateUser
    @UserID INT,
    @UserName NVARCHAR(100),
    @Email NVARCHAR(100),
    @UserPassword NVARCHAR(100),
    @Gender CHAR(1),
    @DateOfBirth DATE,
    @Status NVARCHAR(50),
    @OrganizationID INT = NULL
AS
BEGIN
    -- 1. Validate user exists
    IF NOT EXISTS (SELECT 1 FROM USER_ACCOUNT WHERE UserID = @UserID)
    BEGIN
        RAISERROR('UserID does not exist!', 16, 1);
        RETURN;
    END

    -- 2. Validate Email Format
    IF (@Email NOT LIKE '%@%.%')
    BEGIN
        RAISERROR('Invalid email format!', 16, 1);
        RETURN;
    END

    -- 3. Email duplicate check (not from the same User)
    IF EXISTS (SELECT 1 FROM USER_ACCOUNT WHERE Email = @Email AND UserID <> @UserID)
    BEGIN
        RAISERROR('Email already belongs to another user!', 16, 1);
        RETURN;
    END

    -- 4. Validate Gender
    IF (@Gender NOT IN ('M','F'))
    BEGIN
        RAISERROR('Gender must be M or F!', 16, 1);
        RETURN;
    END

    -- 5. Validate DOB
    IF (@DateOfBirth >= GETDATE())
    BEGIN
        RAISERROR('Date of birth must be less than current date!', 16, 1);
        RETURN;
    END

    -- 6. Validate Organization
    IF (@OrganizationID IS NOT NULL AND 
        NOT EXISTS (SELECT 1 FROM ORGANIZATION WHERE OrganizationID = @OrganizationID))
    BEGIN
        RAISERROR('OrganizationID does not exist!', 16, 1);
        RETURN;
    END

    -- UPDATE USER
    UPDATE USER_ACCOUNT
    SET UserName = @UserName,
        Email = @Email,
        UserPassword = @UserPassword,
        Gender = @Gender,
        DateOfBirth = @DateOfBirth,
        UserAge = DATEDIFF(YEAR, @DateOfBirth, GETDATE()),
        Status = @Status,
        OrganizationID = @OrganizationID
    WHERE UserID = @UserID;

    PRINT 'User updated successfully!';
END;
GO


CREATE OR ALTER PROCEDURE dbo.usp_DeleteUserAccount
    @UserID INT
AS
BEGIN
    SET NOCOUNT ON;
    
    -- 1. User must exist
    IF NOT EXISTS (SELECT 1 FROM USER_ACCOUNT WHERE UserID = @UserID)
    BEGIN
        RAISERROR('UserID does not exist!', 16, 1);
        RETURN;
    END

    -- 2. Delete from role tables first (cascade delete)
    DELETE FROM STUDENT WHERE UserID = @UserID;
    DELETE FROM INSTRUCTOR WHERE UserID = @UserID;
    DELETE FROM ADMIN WHERE UserID = @UserID;
    
    -- 3. Delete from other related tables if needed
    DELETE FROM USER_FORUM_MOD WHERE UserID = @UserID;
    DELETE FROM USER_FORUM_JOIN WHERE UserID = @UserID;
    DELETE FROM USER_ORGANIZATION WHERE UserID = @UserID;
    DELETE FROM QUIZ_RESULT WHERE StudentID = @UserID;
    DELETE FROM DOCUMENT_DOWNLOAD WHERE StudentID = @UserID;
    DELETE FROM STUDENT_COURSE WHERE StudentID = @UserID;
    DELETE FROM CERTIFICATE WHERE StudentID = @UserID;
    DELETE FROM STUDENT_GUARDIAN WHERE StudentID = @UserID;
    DELETE FROM ADMIN_SUPERVISE WHERE SupervisorID = @UserID OR SubAdminID = @UserID;
    
    -- 4. Check for critical constraints that should prevent deletion
    IF EXISTS (SELECT 1 FROM POST WHERE AuthorID = @UserID)
    BEGIN
        RAISERROR('Cannot delete because User has created POSTS! Delete posts first.', 16, 1);
        RETURN;
    END
    
    IF EXISTS (SELECT 1 FROM FORUM WHERE CreatorID = @UserID)
    BEGIN
        RAISERROR('Cannot delete because User has created FORUMS! Delete forums first.', 16, 1);
        RETURN;
    END
    
    IF EXISTS (SELECT 1 FROM COURSE WHERE InstructorID = @UserID)
    BEGIN
        RAISERROR('Cannot delete because User is teaching COURSES! Reassign courses first.', 16, 1);
        RETURN;
    END

    -- 5. Finally delete the user account
    DELETE FROM USER_ACCOUNT WHERE UserID = @UserID;
    
    PRINT 'User deleted successfully!';
END;
GO

CREATE OR ALTER PROCEDURE sp_DeleteUser
    @UserID INT
AS
BEGIN
    -- 1. User must exist
    IF NOT EXISTS (SELECT 1 FROM USER_ACCOUNT WHERE UserID = @UserID)
    BEGIN
        RAISERROR('UserID does not exist!', 16, 1);
        RETURN;
    END

    -- 2. Cannot delete if User is a Student
    IF EXISTS (SELECT 1 FROM STUDENT WHERE UserID = @UserID)
    BEGIN
        RAISERROR('Cannot delete because User is a STUDENT!', 16, 1);
        RETURN;
    END

    -- 3. Cannot delete if User is an Instructor
    IF EXISTS (SELECT 1 FROM INSTRUCTOR WHERE UserID = @UserID)
    BEGIN
        RAISERROR('Cannot delete because User is an INSTRUCTOR!', 16, 1);
        RETURN;
    END

    -- 4. Cannot delete if User is an Admin
    IF EXISTS (SELECT 1 FROM ADMIN WHERE UserID = @UserID)
    BEGIN
        RAISERROR('Cannot delete because User is an ADMIN!', 16, 1);
        RETURN;
    END

    -- 5. Cannot delete if User is author of posts
    IF EXISTS (SELECT 1 FROM POST WHERE AuthorID = @UserID)
    BEGIN
        RAISERROR('Cannot delete because User has created POSTS!', 16, 1);
        RETURN;
    END

    -- 6. Cannot delete if User created forums
    IF EXISTS (SELECT 1 FROM FORUM WHERE CreatorID = @UserID)
    BEGIN
        RAISERROR('Cannot delete because User has created FORUMS!', 16, 1);
        RETURN;
    END

    -- 7. Cannot delete if User is a Moderator
    IF EXISTS (SELECT 1 FROM USER_FORUM_MOD WHERE UserID = @UserID)
    BEGIN
        RAISERROR('Cannot delete because User is a MODERATOR!', 16, 1);
        RETURN;
    END

    -- 8. If all checks pass, delete the user
    DELETE FROM USER_ACCOUNT WHERE UserID = @UserID;

    PRINT 'User deleted successfully!';
END;
GO


--2.3--
CREATE OR ALTER PROCEDURE sp_GetStudentsByMajor
    @Major NVARCHAR(100)
AS
BEGIN
    SELECT 
        UA.UserID,
        UA.UserName,
        UA.Email,
        S.Major,
        S.Education_Level
    FROM STUDENT S
    INNER JOIN USER_ACCOUNT UA ON S.UserID = UA.UserID
    WHERE S.Major = @Major
    ORDER BY UA.UserName ASC;
END;
GO

-----
CREATE OR ALTER PROCEDURE sp_GetCourseStats
    @MinStudents INT
AS
BEGIN
    SELECT 
        C.CourseID,
        C.Name AS CourseName,
        COUNT(SC.StudentID) AS TotalStudents,
        MAX(C.Price) AS CoursePrice
    FROM COURSE C
    LEFT JOIN STUDENT_COURSE SC ON C.CourseID = SC.CourseID
    WHERE C.Price >= 0   -- Price condition
    GROUP BY C.CourseID, C.Name
    HAVING COUNT(SC.StudentID) >= @MinStudents
    ORDER BY TotalStudents DESC;
END;
GO