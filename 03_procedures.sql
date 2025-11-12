USE BTL2_DATABASE;
GO

-- ===============================================
-- FILE: 03_procedures.sql
-- Mô tả: Chứa các Stored Procedure cho bảng STUDENT
-- ===============================================


CREATE PROCEDURE sp_AddStudent
    @UserName NVARCHAR(100),
    @Email NVARCHAR(100),
    @UserPassword NVARCHAR(100),
    @Gender CHAR(1),
    @DateOfBirth DATE,
    @Major NVARCHAR(100) = NULL,
    @Education_Level NVARCHAR(50) = NULL,
    @GuardianID INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- basic email validation
    IF PATINDEX('%_@_%._%_', @Email) = 0
    BEGIN
        RAISERROR('Email không hợp lệ: %s', 16, 1, @Email);
        RETURN;
    END

    -- Gender check
    IF @Gender NOT IN ('M','F')
    BEGIN
        RAISERROR('Giới tính không hợp lệ: %s. Phải là ''M'' hoặc ''F''.', 16, 1, @Gender);
        RETURN;
    END

    -- calculate age
    DECLARE @age INT = DATEDIFF(YEAR, @DateOfBirth, GETDATE())
        - CASE WHEN (MONTH(@DateOfBirth) > MONTH(GETDATE()))
                OR (MONTH(@DateOfBirth) = MONTH(GETDATE()) AND DAY(@DateOfBirth) > DAY(GETDATE()))
            THEN 1 ELSE 0 END;

    IF @age < 5
    BEGIN
        RAISERROR('Tuổi của student quá nhỏ: %d. Phải >= 5.', 16, 1, @age);
        RETURN;
    END

    -- if under 18 then guardian is required (either passed or must exist later)
    IF @age < 18 AND @GuardianID IS NULL
    BEGIN
        RAISERROR('Student dưới 18 tuổi (tuổi=%d). Phải cung cấp GuardianID khi thêm.', 16, 1, @age);
        RETURN;
    END

    -- email uniqueness
    IF EXISTS (SELECT 1 FROM USER_ACCOUNT WHERE Email = @Email)
    BEGIN
        RAISERROR('Email đã tồn tại: %s', 16, 1, @Email);
        RETURN;
    END

    -- if GuardianID provided, ensure it exists
    IF @GuardianID IS NOT NULL AND NOT EXISTS (SELECT 1 FROM GUARDIAN WHERE GuardianID = @GuardianID)
    BEGIN
        RAISERROR('GuardianID không tồn tại: %d', 16, 1, @GuardianID);
        RETURN;
    END

    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO USER_ACCOUNT (UserName, Email, UserPassword, Gender, DateOfBirth, Status)
        VALUES (@UserName, @Email, @UserPassword, @Gender, @DateOfBirth, 'Active');

        DECLARE @newUserID INT = SCOPE_IDENTITY();

        INSERT INTO STUDENT (UserID, Major, Education_Level)
        VALUES (@newUserID, @Major, @Education_Level);

        -- if guardian provided, insert mapping
        IF @GuardianID IS NOT NULL
        BEGIN
            INSERT INTO STUDENT_GUARDIAN (StudentID, GuardianID)
            VALUES (@newUserID, @GuardianID);
        END

        COMMIT TRANSACTION;

        -- return new student id
        SELECT @newUserID AS NewStudentUserID;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        DECLARE @err NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR('Lỗi khi thêm Student: %s', 16, 1, @err);
    END CATCH
END;
GO

-- ===========================
-- sp_UpdateStudent
-- Params: @UserID (required), optional fields to update
-- ===========================
CREATE PROCEDURE sp_UpdateStudent
    @UserID INT,
    @UserName NVARCHAR(100) = NULL,
    @Email NVARCHAR(100) = NULL,
    @Major NVARCHAR(100) = NULL,
    @Education_Level NVARCHAR(50) = NULL,
    @DateOfBirth DATE = NULL  -- optional change DOB -> will revalidate guardian rule
AS
BEGIN
    SET NOCOUNT ON;

    IF NOT EXISTS (SELECT 1 FROM STUDENT WHERE UserID = @UserID)
    BEGIN
        RAISERROR('Không tìm thấy Student với UserID = %d', 16, 1, @UserID);
        RETURN;
    END

    -- If email provided, check format and uniqueness
    IF @Email IS NOT NULL
    BEGIN
        IF PATINDEX('%_@_%._%_', @Email) = 0
        BEGIN
            RAISERROR('Email không hợp lệ: %s', 16, 1, @Email);
            RETURN;
        END

        IF EXISTS (SELECT 1 FROM USER_ACCOUNT WHERE Email = @Email AND UserID <> @UserID)
        BEGIN
            RAISERROR('Email đã được sử dụng bởi user khác: %s', 16, 1, @Email);
            RETURN;
        END
    END

    -- If DateOfBirth changed, validate age
    IF @DateOfBirth IS NOT NULL
    BEGIN
        DECLARE @newAge INT = DATEDIFF(YEAR, @DateOfBirth, GETDATE())
            - CASE WHEN (MONTH(@DateOfBirth) > MONTH(GETDATE()))
                    OR (MONTH(@DateOfBirth) = MONTH(GETDATE()) AND DAY(@DateOfBirth) > DAY(GETDATE()))
                THEN 1 ELSE 0 END;

        IF @newAge < 5
        BEGIN
            RAISERROR('Tuổi sau khi cập nhật quá nhỏ: %d (phải >=5).', 16, 1, @newAge);
            RETURN;
        END

        -- if new age < 18 ensure guardian exists
        IF @newAge < 18
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM STUDENT_GUARDIAN WHERE StudentID = @UserID)
            BEGIN
                RAISERROR('Sau khi cập nhật DateOfBirth, Student sẽ <18 và chưa có Guardian liên kết. Thêm Guardian trước khi cập nhật.', 16, 1);
                RETURN;
            END
        END
    END

    BEGIN TRY
        BEGIN TRANSACTION;

        -- update USER_ACCOUNT part
        IF @UserName IS NOT NULL OR @Email IS NOT NULL OR @DateOfBirth IS NOT NULL
        BEGIN
            UPDATE USER_ACCOUNT
            SET
                UserName = COALESCE(@UserName, UserName),
                Email = COALESCE(@Email, Email),
                DateOfBirth = COALESCE(@DateOfBirth, DateOfBirth)
            WHERE UserID = @UserID;
        END

        -- update STUDENT part
        IF @Major IS NOT NULL OR @Education_Level IS NOT NULL
        BEGIN
            UPDATE STUDENT
            SET
                Major = COALESCE(@Major, Major),
                Education_Level = COALESCE(@Education_Level, Education_Level)
            WHERE UserID = @UserID;
        END

        COMMIT TRANSACTION;
        PRINT 'Cập nhật Student thành công.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RAISERROR('Lỗi khi cập nhật Student: %s', 16, 1, ERROR_MESSAGE());
    END CATCH
END;
GO

-- ===========================
-- sp_DeleteStudent
-- Params:
-- @UserID INT,
-- @ForceDelete BIT = 0 (0: chặn nếu có FK; 1: xóa có cascade các bảng relation)
-- ===========================
CREATE PROCEDURE sp_DeleteStudent
    @UserID INT,
    @ForceDelete BIT = 0
AS
BEGIN
    SET NOCOUNT ON;

    IF NOT EXISTS (SELECT 1 FROM STUDENT WHERE UserID = @UserID)
    BEGIN
        RAISERROR('Student không tồn tại: %d', 16, 1, @UserID);
        RETURN;
    END

    -- check related data; collect messages
    DECLARE @msg NVARCHAR(MAX) = '';
    IF EXISTS (SELECT 1 FROM STUDENT_COURSE WHERE StudentID = @UserID)
        SET @msg = @msg + 'Student đang tham gia ít nhất 1 khóa học (STUDENT_COURSE). ';
    IF EXISTS (SELECT 1 FROM CERTIFICATE WHERE StudentID = @UserID)
        SET @msg = @msg + 'Student có 1+ certificate (CERTIFICATE). ';
    IF EXISTS (SELECT 1 FROM QUIZ_RESULT WHERE StudentID = @UserID)
        SET @msg = @msg + 'Student có kết quả quiz (QUIZ_RESULT). ';
    IF EXISTS (SELECT 1 FROM DOCUMENT_DOWNLOAD WHERE StudentID = @UserID)
        SET @msg = @msg + 'Student đã download tài liệu (DOCUMENT_DOWNLOAD). ';
    IF EXISTS (SELECT 1 FROM USER_FORUM_JOIN WHERE UserID = @UserID)
        SET @msg = @msg + 'Student là thành viên 1+ forum (USER_FORUM_JOIN). ';
    IF EXISTS (SELECT 1 FROM USER_FORUM_MOD WHERE UserID = @UserID)
        SET @msg = @msg + 'Student là moderator 1+ forum (USER_FORUM_MOD). ';
    IF EXISTS (SELECT 1 FROM POST WHERE AuthorID = @UserID)
        SET @msg = @msg + 'Student đã tạo bài viết (POST). ';
    IF EXISTS (SELECT 1 FROM SSO WHERE UserID = @UserID)
        SET @msg = @msg + 'Student có đăng nhập SSO liên kết (SSO). ';
    IF EXISTS (SELECT 1 FROM STUDENT_GUARDIAN WHERE StudentID = @UserID)
        SET @msg = @msg + 'Student có guardian liên kết (STUDENT_GUARDIAN). ';

    IF @msg <> '' AND @ForceDelete = 0
    BEGIN
        RAISERROR('Không thể xóa Student %d. Lý do: %s', 16, 1, @UserID, @msg);
        RETURN;
    END

    BEGIN TRY
        BEGIN TRANSACTION;

        IF @ForceDelete = 1
        BEGIN
            -- Order: delete child relations first, then STUDENT, then USER_ACCOUNT
            DELETE FROM STUDENT_GUARDIAN WHERE StudentID = @UserID;
            DELETE FROM DOCUMENT_DOWNLOAD WHERE StudentID = @UserID;
            DELETE FROM QUIZ_RESULT WHERE StudentID = @UserID;
            DELETE FROM CERTIFICATE WHERE StudentID = @UserID;
            DELETE FROM STUDENT_COURSE WHERE StudentID = @UserID;
            DELETE FROM USER_FORUM_JOIN WHERE UserID = @UserID;
            DELETE FROM USER_FORUM_MOD WHERE UserID = @UserID;
            DELETE FROM POST WHERE AuthorID = @UserID;
            DELETE FROM SSO WHERE UserID = @UserID;

            -- Finally delete STUDENT and USER_ACCOUNT
            DELETE FROM STUDENT WHERE UserID = @UserID;
            DELETE FROM USER_ACCOUNT WHERE UserID = @UserID;
        END
        ELSE
        BEGIN
            -- safe delete (no cascade) - if no dependencies then delete
            DELETE FROM STUDENT_GUARDIAN WHERE StudentID = @UserID; -- this will be empty normally
            DELETE FROM STUDENT WHERE UserID = @UserID;
            DELETE FROM USER_ACCOUNT WHERE UserID = @UserID;
        END

        COMMIT TRANSACTION;
        PRINT 'Xóa Student thành công.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RAISERROR('Lỗi khi xóa Student: %s', 16, 1, ERROR_MESSAGE());
    END CATCH
END;
GO
