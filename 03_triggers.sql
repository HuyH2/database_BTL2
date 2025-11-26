USE BTL2;
Go

--TRIGGER Ràng buộc ngữ nghĩa

CREATE OR ALTER TRIGGER TRG_JoinForum_RequireEnroll
ON USER_FORUM_JOIN
AFTER INSERT
AS
BEGIN
    DECLARE @UserID INT, @ForumID INT, @CourseID INT;

    SELECT @UserID = UserID, @ForumID = ForumID FROM inserted;

    SELECT @CourseID = CourseID FROM FORUM WHERE ForumID = @ForumID;

    IF NOT EXISTS (
        SELECT 1 FROM STUDENT_COURSE 
        WHERE StudentID = @UserID AND CourseID = @CourseID
    )
    BEGIN
        RAISERROR ('Student phải enroll khóa học trước khi join forum!',16,1);
        ROLLBACK TRANSACTION;
    END
END;
GO




CREATE OR ALTER TRIGGER TRG_Post_RequireEnroll
ON POST
AFTER INSERT
AS
BEGIN
    DECLARE @UserID INT, @ForumID INT, @CourseID INT;

    SELECT @UserID = AuthorID, @ForumID = ForumID FROM inserted;

    SELECT @CourseID = CourseID FROM FORUM WHERE ForumID = @ForumID;

    IF NOT EXISTS (
        SELECT 1 FROM STUDENT_COURSE 
        WHERE StudentID = @UserID AND CourseID = @CourseID
    )
    BEGIN
        RAISERROR ('Student phải enroll khóa học mới được đăng bài!',16,1);
        ROLLBACK TRANSACTION;
    END
END;
GO

CREATE OR ALTER TRIGGER TRG_NoEnroll_OwnCourse
ON STUDENT_COURSE
AFTER INSERT
AS
BEGIN
    DECLARE @StudentID INT, @CourseID INT, @InstructorID INT;

    SELECT @StudentID = StudentID, @CourseID = CourseID FROM inserted;

    SELECT @InstructorID = InstructorID FROM COURSE WHERE CourseID = @CourseID;

    IF (@StudentID = @InstructorID)
    BEGIN
        RAISERROR ('Instructor không thể enroll khóa học của chính mình!',16,1);
        ROLLBACK TRANSACTION;
    END
END;
GO

CREATE OR ALTER TRIGGER TRG_Certificate_RequireFullProgress
ON CERTIFICATE
AFTER INSERT
AS
BEGIN
    DECLARE @StudentID INT, @CourseID INT, @Progress FLOAT;

    SELECT @StudentID = StudentID, @CourseID = CourseID FROM inserted;

    SELECT @Progress = Progress 
    FROM STUDENT_COURSE 
    WHERE StudentID = @StudentID AND CourseID = @CourseID;

    IF (@Progress < 100)
    BEGIN
        RAISERROR ('Student phải đạt 100%% progress mới được cấp certificate!',16,1);
        ROLLBACK TRANSACTION;
    END
END;
GO


CREATE OR ALTER TRIGGER TRG_Download_RequireEnroll
ON DOCUMENT_DOWNLOAD
AFTER INSERT
AS
BEGIN
    DECLARE @StudentID INT, @ContentID INT, @LessonID INT, @CourseID INT;

    SELECT @StudentID = StudentID, @ContentID = ContentID FROM inserted;

    SELECT @LessonID = LessonID FROM CONTENT_ITEM WHERE ContentID = @ContentID;
    SELECT @CourseID = CourseID FROM LESSON WHERE LessonID = @LessonID;

    IF NOT EXISTS (
        SELECT 1 FROM STUDENT_COURSE 
        WHERE StudentID = @StudentID AND CourseID = @CourseID
    )
    BEGIN
        RAISERROR ('Student phải enroll khóa mới được download tài liệu!',16,1);
        ROLLBACK TRANSACTION;
    END
END;
GO

CREATE OR ALTER TRIGGER TRG_Quiz_RequireEnroll
ON QUIZ_RESULT
AFTER INSERT
AS
BEGIN
    DECLARE @StudentID INT, @ContentID INT, @LessonID INT, @CourseID INT;

    SELECT @StudentID = StudentID, @ContentID = ContentID FROM inserted;

    SELECT @LessonID = LessonID FROM CONTENT_ITEM WHERE ContentID = @ContentID;
    SELECT @CourseID = CourseID FROM LESSON WHERE LessonID = @LessonID;

    IF NOT EXISTS (
        SELECT 1 FROM STUDENT_COURSE 
        WHERE StudentID = @StudentID AND CourseID = @CourseID
    )
    BEGIN
        RAISERROR ('Student phải enroll khóa mới được làm quiz!',16,1);
        ROLLBACK TRANSACTION;
    END
END;
GO



--2.2.1--

CREATE OR ALTER TRIGGER TRG_Role_Student
ON STUDENT
AFTER INSERT, UPDATE
AS
BEGIN
    IF EXISTS (
        SELECT 1
        FROM inserted i
        WHERE 
        (SELECT COUNT(*) FROM STUDENT WHERE UserID = i.UserID) +
        (SELECT COUNT(*) FROM INSTRUCTOR WHERE UserID = i.UserID) +
        (SELECT COUNT(*) FROM ADMIN WHERE UserID = i.UserID) > 1
    )
    BEGIN
        RAISERROR('Một User không thể thuộc nhiều Role!', 16, 1);
        ROLLBACK;
    END
END;
GO




CREATE OR ALTER TRIGGER TRG_Check_User_Role_Instructor
ON INSTRUCTOR
AFTER INSERT, UPDATE
AS
BEGIN
    IF EXISTS (
        SELECT 1
        FROM inserted i
        WHERE 
        (SELECT COUNT(*) FROM STUDENT WHERE UserID = i.UserID) +
        (SELECT COUNT(*) FROM INSTRUCTOR WHERE UserID = i.UserID) +
        (SELECT COUNT(*) FROM ADMIN WHERE UserID = i.UserID) > 1
    )
    BEGIN
        RAISERROR('Một User không thể thuộc nhiều Role!', 16, 1);
        ROLLBACK;
    END
END;
GO


CREATE OR ALTER TRIGGER TRG_Check_User_Role_Admin
ON ADMIN
AFTER INSERT, UPDATE
AS
BEGIN
    IF EXISTS (
        SELECT 1
        FROM inserted i
        WHERE 
        (SELECT COUNT(*) FROM STUDENT WHERE UserID = i.UserID) +
        (SELECT COUNT(*) FROM INSTRUCTOR WHERE UserID = i.UserID) +
        (SELECT COUNT(*) FROM ADMIN WHERE UserID = i.UserID) > 1
    )
    BEGIN
        RAISERROR('Một User không thể thuộc nhiều Role!', 16, 1);
        ROLLBACK;
    END
END;
GO


--2.2.2--
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
