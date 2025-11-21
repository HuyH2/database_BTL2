USE BTL2;
Go

CREATE OR ALTER PROCEDURE sp_AddUser
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
        RAISERROR('Email không h?p l?! Ð?nh d?ng ph?i gi?ng ví d?: name@gmail.com', 16, 1);
        RETURN;
    END

    -- 2. Validate Email duplicate
    IF EXISTS (SELECT 1 FROM USER_ACCOUNT WHERE Email = @Email)
    BEGIN
        RAISERROR('Email này ð? t?n t?i trong h? th?ng!', 16, 1);
        RETURN;
    END

    -- 3. Validate Gender
    IF (@Gender NOT IN ('M','F'))
    BEGIN
        RAISERROR('Gi?i tính ph?i là M ho?c F!', 16, 1);
        RETURN;
    END

    -- 4. Validate DateOfBirth
    IF (@DateOfBirth >= GETDATE())
    BEGIN
        RAISERROR('Ngày sinh ph?i nh? hõn ngày hi?n t?i!', 16, 1);
        RETURN;
    END

    -- 5. Validate OrganizationID (if provided)
    IF (@OrganizationID IS NOT NULL AND 
        NOT EXISTS (SELECT 1 FROM ORGANIZATION WHERE OrganizationID = @OrganizationID))
    BEGIN
        RAISERROR('OrganizationID không t?n t?i!', 16, 1);
        RETURN;
    END

    -- INSERT USER
    INSERT INTO USER_ACCOUNT (UserName, Email, UserPassword, Gender, DateOfBirth, UserAge, Status, OrganizationID)
    VALUES (
        @UserName, @Email, @UserPassword, @Gender, 
        @DateOfBirth, DATEDIFF(YEAR, @DateOfBirth, GETDATE()), 
        @Status, @OrganizationID
    );

    PRINT 'Thêm User thành công!';
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
        RAISERROR('UserID không t?n t?i!', 16, 1);
        RETURN;
    END

    -- 2. Validate Email Format
    IF (@Email NOT LIKE '%@%.%')
    BEGIN
        RAISERROR('Email không h?p l?!', 16, 1);
        RETURN;
    END

    -- 3. Email trùng nhýng không ph?i c?a chính User ðó
    IF EXISTS (SELECT 1 FROM USER_ACCOUNT WHERE Email = @Email AND UserID <> @UserID)
    BEGIN
        RAISERROR('Email này ð? thu?c v? ngý?i dùng khác!', 16, 1);
        RETURN;
    END

    -- 4. Validate Gender
    IF (@Gender NOT IN ('M','F'))
    BEGIN
        RAISERROR('Gi?i tính ph?i là M ho?c F!', 16, 1);
        RETURN;
    END

    -- 5. Validate DOB
    IF (@DateOfBirth >= GETDATE())
    BEGIN
        RAISERROR('Ngày sinh ph?i nh? hõn ngày hi?n t?i!', 16, 1);
        RETURN;
    END

    -- 6. Validate Organization
    IF (@OrganizationID IS NOT NULL AND 
        NOT EXISTS (SELECT 1 FROM ORGANIZATION WHERE OrganizationID = @OrganizationID))
    BEGIN
        RAISERROR('OrganizationID không t?n t?i!', 16, 1);
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

    PRINT 'C?p nh?t User thành công!';
END;
GO


CREATE OR ALTER PROCEDURE sp_DeleteUser
    @UserID INT
AS
BEGIN
    -- 1. User ph?i t?n t?i
    IF NOT EXISTS (SELECT 1 FROM USER_ACCOUNT WHERE UserID = @UserID)
    BEGIN
        RAISERROR('UserID không t?n t?i!', 16, 1);
        RETURN;
    END

    -- 2. Không xóa n?u User là Student
    IF EXISTS (SELECT 1 FROM STUDENT WHERE UserID = @UserID)
    BEGIN
        RAISERROR('Không th? xóa v? User này ðang là STUDENT!', 16, 1);
        RETURN;
    END

    -- 3. Không xóa n?u User là Instructor
    IF EXISTS (SELECT 1 FROM INSTRUCTOR WHERE UserID = @UserID)
    BEGIN
        RAISERROR('Không th? xóa v? User này ðang là INSTRUCTOR!', 16, 1);
        RETURN;
    END

    -- 4. Không xóa n?u User là Admin
    IF EXISTS (SELECT 1 FROM ADMIN WHERE UserID = @UserID)
    BEGIN
        RAISERROR('Không th? xóa v? User này ðang là ADMIN!', 16, 1);
        RETURN;
    END

    -- 5. Không xóa n?u là tác gi? bài vi?t
    IF EXISTS (SELECT 1 FROM POST WHERE AuthorID = @UserID)
    BEGIN
        RAISERROR('Không th? xóa v? User này ð? ðãng bài POST!', 16, 1);
        RETURN;
    END

    -- 6. Không xóa n?u t?o forum
    IF EXISTS (SELECT 1 FROM FORUM WHERE CreatorID = @UserID)
    BEGIN
        RAISERROR('Không th? xóa v? User này ð? t?o FORUM!', 16, 1);
        RETURN;
    END

    -- 7. Không xóa n?u ðang làm Moderator
    IF EXISTS (SELECT 1 FROM USER_FORUM_MOD WHERE UserID = @UserID)
    BEGIN
        RAISERROR('Không th? xóa v? User này ðang làm MODERATOR!', 16, 1);
        RETURN;
    END

    -- 8. N?u t?t c? ð? OK ? Xóa ðý?c
    DELETE FROM USER_ACCOUNT WHERE UserID = @UserID;

    PRINT 'Xóa User thành công!';
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
    WHERE C.Price >= 0   -- ði?u ki?n where
    GROUP BY C.CourseID, C.Name
    HAVING COUNT(SC.StudentID) >= @MinStudents
    ORDER BY TotalStudents DESC;
END;
GO
