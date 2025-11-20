USE BTL2;
Go

CREATE OR ALTER TRIGGER TRG_Check_User_Role
ON STUDENT, INSTRUCTOR, ADMIN
AFTER INSERT, UPDATE
AS
BEGIN
    DECLARE @UserID INT;

    SELECT @UserID = UserID FROM inserted;

    -- Ð?m s? role mà user ðang có
    DECLARE @RoleCount INT = (
        SELECT 
            (SELECT COUNT(*) FROM STUDENT WHERE UserID = @UserID) +
            (SELECT COUNT(*) FROM INSTRUCTOR WHERE UserID = @UserID) +
            (SELECT COUNT(*) FROM ADMIN WHERE UserID = @UserID)
    );

    IF (@RoleCount > 1)
    BEGIN
        RAISERROR ('M?t User không th? thu?c nhi?u Role (Student/Instructor/Admin)!', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
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

