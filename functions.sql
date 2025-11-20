USE BTL2;
Go

--function 1
CREATE OR ALTER FUNCTION fn_CountVideosInCourse
(
    @CourseID INT
)
RETURNS INT
AS
BEGIN
    -- Validate tham s? ð?u vào
    IF (@CourseID IS NULL OR @CourseID <= 0)
        RETURN -1;  -- l?i tham s?

    DECLARE @LessonID INT,
            @ContentID INT,
            @CountVideos INT = 0;

    -- CURSOR l?y toàn b? Video c?a m?t Course
    DECLARE VideoCursor CURSOR FOR
        SELECT CI.ContentID
        FROM COURSE C
        JOIN LESSON L ON C.CourseID = L.CourseID
        JOIN CONTENT_ITEM CI ON CI.LessonID = L.LessonID
        WHERE C.CourseID = @CourseID
          AND CI.ContentID IN (SELECT ContentID FROM VIDEO);

    OPEN VideoCursor;
    FETCH NEXT FROM VideoCursor INTO @ContentID;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        SET @CountVideos += 1;
        FETCH NEXT FROM VideoCursor INTO @ContentID;
    END

    CLOSE VideoCursor;
    DEALLOCATE VideoCursor;

    RETURN @CountVideos;
END;
GO
--call function 1 : SELECT dbo.fn_CountVideosInCourse(1) AS TotalVideos;



--function 2
CREATE OR ALTER FUNCTION fn_TotalQuizScoreByStudent
(
    @StudentID INT
)
RETURNS FLOAT
AS
BEGIN
    -- Validate tham s?
    IF (@StudentID IS NULL OR @StudentID <= 0)
        RETURN -1;  -- tham s? sai

    DECLARE @Score FLOAT = 0,
            @ContentID INT,
            @Total FLOAT = 0;

    -- CURSOR truy t?t c? quiz mà student ð? làm
    DECLARE QuizCursor CURSOR FOR
        SELECT ContentID, Score 
        FROM QUIZ_RESULT 
        WHERE StudentID = @StudentID;

    OPEN QuizCursor;
    FETCH NEXT FROM QuizCursor INTO @ContentID, @Score;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        SET @Total += @Score;
        FETCH NEXT FROM QuizCursor INTO @ContentID, @Score;
    END

    CLOSE QuizCursor;
    DEALLOCATE QuizCursor;

    RETURN @Total;
END;
GO
--call function 2: SELECT dbo.fn_TotalQuizScoreByStudent(1) AS TotalScore;
