USE BTL2_DATABASE;
GO

CREATE OR ALTER TRIGGER trg_UpdateUserAge
ON USER_ACCOUNT
AFTER INSERT, UPDATE
AS
BEGIN
    UPDATE ua
    SET ua.UserAge =
        DATEDIFF(YEAR, ua.DateOfBirth, GETDATE())
        - CASE 
            WHEN (MONTH(ua.DateOfBirth) > MONTH(GETDATE()))
              OR (MONTH(ua.DateOfBirth) = MONTH(GETDATE()) AND DAY(ua.DateOfBirth) > DAY(GETDATE()))
            THEN 1 ELSE 0 
          END
    FROM USER_ACCOUNT ua
    JOIN inserted i ON ua.UserID = i.UserID;
END;
GO