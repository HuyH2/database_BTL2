 USE BTL2;
Go



--2.1--
CREATE OR ALTER PROCEDURE dbo.usp_AddUser
    @UserName NVARCHAR(100),
    @Email NVARCHAR(100),
    @UserPassword NVARCHAR(100),
    @Gender CHAR(1),
    @DateOfBirth DATE,
    @Status NVARCHAR(50),
    @OrganizationID INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- 1. Validate Email Format
    IF (@Email NOT LIKE '%@%.%')
    BEGIN
        RAISERROR('Email không hợp lệ! Định dạng phải giống ví dụ: name@gmail.com', 16, 1);
        RETURN;
    END

    -- 2. Validate Email duplicate
    IF EXISTS (SELECT 1 FROM USER_ACCOUNT WHERE Email = @Email)
    BEGIN
        RAISERROR('Email này đã tồn tại trong hệ thống!', 16, 1);
        RETURN;
    END

    -- 3. Validate Gender
    IF (@Gender NOT IN ('M','F'))
    BEGIN
        RAISERROR('Giới tính phải là M hoặc F!', 16, 1);
        RETURN;
    END

    -- 4. Validate DateOfBirth
    IF (@DateOfBirth >= GETDATE())
    BEGIN
        RAISERROR('Ngày sinh phải nhỏ hơn ngày hiện tại!', 16, 1);
        RETURN;
    END

    -- 5. Validate OrganizationID (if provided)
    IF (@OrganizationID IS NOT NULL AND 
        NOT EXISTS (SELECT 1 FROM ORGANIZATION WHERE OrganizationID = @OrganizationID))
    BEGIN
        RAISERROR('OrganizationID không tồn tại!', 16, 1);
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


CREATE OR ALTER PROCEDURE dbo.usp_UpdateUser
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
SET NOCOUNT ON;

    -- 1. Validate user exists
    IF NOT EXISTS (SELECT 1 FROM USER_ACCOUNT WHERE UserID = @UserID)
    BEGIN
        RAISERROR('UserID không tồn tại!', 16, 1);
        RETURN;
    END

    -- 2. Validate Email Format
    IF (@Email NOT LIKE '%@%.%')
    BEGIN
        RAISERROR('Email không hợp lệ!', 16, 1);
        RETURN;
    END

    -- 3. Email trùng nhưng không phải của chính User đó
    IF EXISTS (SELECT 1 FROM USER_ACCOUNT WHERE Email = @Email AND UserID <> @UserID)
    BEGIN
        RAISERROR('Email này đã thuộc về người dùng khác!', 16, 1);
        RETURN;
    END

    -- 4. Validate Gender
    IF (@Gender NOT IN ('M','F'))
    BEGIN
        RAISERROR('Giới tính phải là M hoặc F!', 16, 1);
        RETURN;
    END

    -- 5. Validate DOB
    IF (@DateOfBirth >= GETDATE())
    BEGIN
        RAISERROR('Ngày sinh phải nhỏ hơn ngày hiện tại!', 16, 1);
        RETURN;
    END

    -- 6. Validate Organization
    IF (@OrganizationID IS NOT NULL AND 
        NOT EXISTS (SELECT 1 FROM ORGANIZATION WHERE OrganizationID = @OrganizationID))
    BEGIN
        RAISERROR('OrganizationID không tồn tại!', 16, 1);
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

    PRINT 'Cập nhật User thành công!';
END;
GO


CREATE OR ALTER PROCEDURE dbo.usp_DeleteUser
    @UserID INT
AS
BEGIN
SET NOCOUNT ON;
    -- 1. User phải tồn tại
    IF NOT EXISTS (SELECT 1 FROM USER_ACCOUNT WHERE UserID = @UserID)
    BEGIN
        RAISERROR('UserID không tồn tại!', 16, 1);
        RETURN;
    END

    -- 2. Không xóa nếu User là Student
    IF EXISTS (SELECT 1 FROM STUDENT WHERE UserID = @UserID)
    BEGIN
        RAISERROR('Không thể xóa vì User này đang là STUDENT!', 16, 1);
        RETURN;
    END

    -- 3. Không xóa nếu User là Instructor
    IF EXISTS (SELECT 1 FROM INSTRUCTOR WHERE UserID = @UserID)
    BEGIN
        RAISERROR('Không thể xóa vì User này đang là INSTRUCTOR!', 16, 1);
        RETURN;
    END

    -- 4. Không xóa nếu User là Admin
    IF EXISTS (SELECT 1 FROM ADMIN WHERE UserID = @UserID)
    BEGIN
        RAISERROR('Không thể xóa vì User này đang là ADMIN!', 16, 1);
        RETURN;
    END

    -- 5. Không xóa nếu là tác giả bài viết
    IF EXISTS (SELECT 1 FROM POST WHERE AuthorID = @UserID)
    BEGIN
        RAISERROR('Không thể xóa vì User này đã đăng bài POST!', 16, 1);
        RETURN;
    END

    -- 6. Không xóa nếu tạo forum
    IF EXISTS (SELECT 1 FROM FORUM WHERE CreatorID = @UserID)
    BEGIN
        RAISERROR('Không thể xóa vì User này đã tạo FORUM!', 16, 1);
        RETURN;
    END

    -- 7. Không xóa nếu đang làm Moderator
    IF EXISTS (SELECT 1 FROM USER_FORUM_MOD WHERE UserID = @UserID)
    BEGIN
        RAISERROR('Không thể xóa vì User này đang làm MODERATOR!', 16, 1);
        RETURN;
    END

    -- 8. Nếu tất cả đã OK Xóa được
    DELETE FROM USER_ACCOUNT WHERE UserID = @UserID;

    PRINT 'Xóa User thành công!';
END;
GO

-----------
----2.3----
------------
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
    WHERE C.Price >= 0   -- điều kiện where
    GROUP BY C.CourseID, C.Name
    HAVING COUNT(SC.StudentID) >= @MinStudents
    ORDER BY TotalStudents DESC;
END;
GO
