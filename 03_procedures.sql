USE BTL2_DATABASE;
GO

-- ===============================================
-- FILE: 03_procedures.sql
-- Mô tả: Chứa các Stored Procedure cho bảng STUDENT
-- ===============================================

--Insert
CREATE OR ALTER PROCEDURE sp_InsertUser
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

    -- Kiểm tra dữ liệu trống
    IF (@UserName IS NULL OR LTRIM(RTRIM(@UserName)) = '')
        RETURN RAISERROR(N'Tên người dùng không được để trống!', 16, 1);

    IF (@UserPassword IS NULL OR LEN(@UserPassword) < 3)
        RETURN RAISERROR(N'Mật khẩu phải có ít nhất 3 ký tự!', 16, 1);

    -- Validate Email format
    IF (@Email NOT LIKE '%@%.%' OR CHARINDEX(' ', @Email) > 0)
        RETURN RAISERROR(N'Email không hợp lệ!', 16, 1);

    -- Email trùng
    IF EXISTS (SELECT 1 FROM USER_ACCOUNT WHERE Email = @Email)
        RETURN RAISERROR(N'Email này đã được sử dụng!', 16, 1);

    -- Gender check
    IF (@Gender NOT IN ('M','F'))
        RETURN RAISERROR(N'Giới tính phải là M hoặc F!', 16, 1);

    -- Check tuổi >= 18
    DECLARE @Age INT =
        DATEDIFF(YEAR, @DateOfBirth, GETDATE())
        - CASE WHEN (MONTH(@DateOfBirth) > MONTH(GETDATE()))
               OR (MONTH(@DateOfBirth) = MONTH(GETDATE()) AND DAY(@DateOfBirth) > DAY(GETDATE()))
               THEN 1 ELSE 0 END;

    IF (@Age < 18)
        RETURN RAISERROR(N'Người dùng phải từ 18 tuổi trở lên!', 16, 1);

    -- Check Organization tồn tại
    IF (@OrganizationID IS NOT NULL AND NOT EXISTS (
        SELECT 1 FROM ORGANIZATION WHERE OrganizationID = @OrganizationID))
        RETURN RAISERROR(N'Tổ chức không tồn tại!', 16, 1);

    -- Thêm user
    INSERT INTO USER_ACCOUNT (UserName, Email, UserPassword, Gender, DateOfBirth, UserAge, Status, OrganizationID)
    VALUES (@UserName, @Email, @UserPassword, @Gender, @DateOfBirth, @Age, @Status, @OrganizationID);

    PRINT N'Thêm người dùng thành công!';
END;
GO

--Update
CREATE OR ALTER PROCEDURE sp_UpdateUser
    @UserID INT,
    @UserName NVARCHAR(100),
    @Email NVARCHAR(100),
    @Status NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    -- User có tồn tại?
    IF NOT EXISTS (SELECT 1 FROM USER_ACCOUNT WHERE UserID = @UserID)
        RETURN RAISERROR(N'Không tìm thấy người dùng để cập nhật!', 16, 1);

    -- Validate email
    IF (@Email NOT LIKE '%@%.%')
        RETURN RAISERROR(N'Email không hợp lệ!', 16, 1);

    -- Trùng email
    IF EXISTS (SELECT 1 FROM USER_ACCOUNT WHERE Email = @Email AND UserID <> @UserID)
        RETURN RAISERROR(N'Email đã có người khác sử dụng!', 16, 1);

    -- Update
    UPDATE USER_ACCOUNT
    SET UserName = @UserName,
        Email = @Email,
        Status = @Status
    WHERE UserID = @UserID;

    PRINT N'Cập nhật thành công!';
END;
GO

-- delete
CREATE OR ALTER PROCEDURE sp_DeleteUser
    @UserID INT
AS
BEGIN
    SET NOCOUNT ON;

    -- User tồn tại?
    IF NOT EXISTS (SELECT 1 FROM USER_ACCOUNT WHERE UserID = @UserID)
        RETURN RAISERROR(N'Không tìm thấy người dùng để xóa!', 16, 1);

    --------------------------------------------------------------------
    -- 1. KHÔNG xóa nếu User thuộc bất kỳ vai trò nào
    --------------------------------------------------------------------
    IF EXISTS (SELECT 1 FROM STUDENT WHERE UserID = @UserID)
        RETURN RAISERROR(N'Không thể xóa vì người dùng đang thuộc vai trò STUDENT!', 16, 1);

    IF EXISTS (SELECT 1 FROM INSTRUCTOR WHERE UserID = @UserID)
        RETURN RAISERROR(N'Không thể xóa vì người dùng đang thuộc vai trò INSTRUCTOR!', 16, 1);

    IF EXISTS (SELECT 1 FROM ADMIN WHERE UserID = @UserID)
        RETURN RAISERROR(N'Không thể xóa vì người dùng đang thuộc vai trò ADMIN!', 16, 1);

    --------------------------------------------------------------------
    -- 2. KHÔNG xóa nếu User có dữ liệu phụ thuộc trong hệ thống
    --------------------------------------------------------------------
    IF EXISTS (SELECT 1 FROM POST WHERE AuthorID = @UserID)
        RETURN RAISERROR(N'Không thể xóa vì người dùng đã đăng bài viết trong forum!', 16, 1);

    IF EXISTS (SELECT 1 FROM FORUM WHERE CreatorID = @UserID)
        RETURN RAISERROR(N'Không thể xóa vì người dùng đang là người tạo forum!', 16, 1);

    IF EXISTS (SELECT 1 FROM USER_FORUM_JOIN WHERE UserID = @UserID)
        RETURN RAISERROR(N'Không thể xóa vì người dùng đang tham gia forum!', 16, 1);

    IF EXISTS (SELECT 1 FROM USER_FORUM_MOD WHERE UserID = @UserID)
        RETURN RAISERROR(N'Không thể xóa vì người dùng đang là moderator!', 16, 1);

    IF EXISTS (SELECT 1 FROM USER_ORGANIZATION WHERE UserID = @UserID)
        RETURN RAISERROR(N'Không thể xóa vì người dùng đang thuộc tổ chức!', 16, 1);

    IF EXISTS (SELECT 1 FROM SSO WHERE UserID = @UserID)
        RETURN RAISERROR(N'Không thể xóa vì người dùng đang liên kết SSO!', 16, 1);

    --------------------------------------------------------------------
    -- 3. CHO PHÉP XÓA
    --------------------------------------------------------------------
    DELETE FROM USER_ACCOUNT WHERE UserID = @UserID;

    PRINT N'Xóa người dùng thành công!';
END;
GO