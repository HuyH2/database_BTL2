USE BTL2;
Go

CREATE OR ALTER TRIGGER TRG_Check_User_Role_Student
ON STUDENT
AFTER INSERT, UPDATE
AS
BEGIN
    DECLARE @UserID INT;
    SELECT @UserID = UserID FROM inserted;

    DECLARE @RoleCount INT = (
        (SELECT COUNT(*) FROM STUDENT WHERE UserID = @UserID) +
        (SELECT COUNT(*) FROM INSTRUCTOR WHERE UserID = @UserID) +
        (SELECT COUNT(*) FROM ADMIN WHERE UserID = @UserID)
    );

    IF (@RoleCount > 1)
    BEGIN
        RAISERROR ('Một User không thể thuộc nhiều Role!', 16, 1);
        ROLLBACK TRANSACTION;
    END
END;
GO


CREATE OR ALTER TRIGGER TRG_Check_User_Role_Instructor
ON INSTRUCTOR
AFTER INSERT, UPDATE
AS
BEGIN
    DECLARE @UserID INT;
    SELECT @UserID = UserID FROM inserted;

    DECLARE @RoleCount INT = (
        (SELECT COUNT(*) FROM STUDENT WHERE UserID = @UserID) +
        (SELECT COUNT(*) FROM INSTRUCTOR WHERE UserID = @UserID) +
        (SELECT COUNT(*) FROM ADMIN WHERE UserID = @UserID)
    );

    IF (@RoleCount > 1)
    BEGIN
        RAISERROR ('Một User không thể thuộc nhiều Role!', 16, 1);
        ROLLBACK TRANSACTION;
    END
END;
GO


CREATE OR ALTER TRIGGER TRG_Check_User_Role_Admin
ON ADMIN
AFTER INSERT, UPDATE
AS
BEGIN
    DECLARE @UserID INT;
    SELECT @UserID = UserID FROM inserted;

    DECLARE @RoleCount INT = (
        (SELECT COUNT(*) FROM STUDENT WHERE UserID = @UserID) +
        (SELECT COUNT(*) FROM INSTRUCTOR WHERE UserID = @UserID) +
        (SELECT COUNT(*) FROM ADMIN WHERE UserID = @UserID)
    );

    IF (@RoleCount > 1)
    BEGIN
        RAISERROR ('Một User không thể thuộc nhiều Role!', 16, 1);
        ROLLBACK TRANSACTION;
    END
END;
GO



CREATE OR ALTER TRIGGER TRG_Calc_UserAge
ON USER_ACCOUNT
AFTER INSERT, UPDATE
AS
BEGIN
    UPDATE USER_ACCOUNT
    SET UserAge = DATEDIFF(YEAR, DateOfBirth, GETDATE())
    WHERE UserID IN (SELECT UserID FROM inserted);
END;
GO

-------------------------------------------------------
UPDATE USER_ACCOUNT
SET UserAge = DATEDIFF(YEAR, DateOfBirth, GETDATE());
-------------------------------------------------------
