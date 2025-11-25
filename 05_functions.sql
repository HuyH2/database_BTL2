USE BTL2;
GO

-- FUNCTION 1: Đếm số lượng video của một khoá học
CREATE OR ALTER FUNCTION fn_CountVideosInCourse
(
    @CourseID INT
)
RETURNS INT
AS
BEGIN
    -- Validate tham số
    IF (@CourseID IS NULL OR @CourseID <= 0)
        RETURN -1;

    DECLARE @ContentID INT,
            @CountVideos INT = 0;

    -- Cursor lấy danh sách video
    DECLARE VideoCursor CURSOR FOR
        SELECT V.ContentID
        FROM COURSE C
        JOIN LESSON L ON C.CourseID = L.CourseID
        JOIN CONTENT_ITEM CI ON CI.LessonID = L.LessonID
        JOIN VIDEO V ON V.ContentID = CI.ContentID
        WHERE C.CourseID = @CourseID;

    OPEN VideoCursor;
    FETCH NEXT FROM VideoCursor INTO @ContentID;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        SET @CountVideos += 1;      -- tăng bộ đếm
        FETCH NEXT FROM VideoCursor INTO @ContentID;
    END

    CLOSE VideoCursor;
    DEALLOCATE VideoCursor;

    RETURN @CountVideos;
END;
GO
--call function 1 : SELECT dbo.fn_CountVideosInCourse(1) AS TotalVideos;



CREATE OR ALTER FUNCTION fn_TotalVideoHoursInCourse
(
    @CourseID INT
)
RETURNS FLOAT
AS
BEGIN
    -- Validate tham số
    IF (@CourseID IS NULL OR @CourseID <= 0)
        RETURN -1;

    DECLARE @VideoDuration INT,
            @TotalMinutes INT = 0;

    -- CURSOR lấy danh sách thời lượng video (đơn vị: phút)
    DECLARE VideoDurationCursor CURSOR FOR
        SELECT V.Duration    -- Duration đang lưu theo PHÚT
        FROM COURSE C
        JOIN LESSON L ON C.CourseID = L.CourseID
        JOIN CONTENT_ITEM CI ON CI.LessonID = L.LessonID
        JOIN VIDEO V ON V.ContentID = CI.ContentID
        WHERE C.CourseID = @CourseID;

    OPEN VideoDurationCursor;
    FETCH NEXT FROM VideoDurationCursor INTO @VideoDuration;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        SET @TotalMinutes += @VideoDuration;   -- cộng tổng số phút
        FETCH NEXT FROM VideoDurationCursor INTO @VideoDuration;
    END

    CLOSE VideoDurationCursor;
    DEALLOCATE VideoDurationCursor;

    -- Chuyển phút → giờ
    RETURN ROUND(CAST(@TotalMinutes AS FLOAT) / 60.0, 2);
END;
GO


--call function 2: dbo.fn_TotalVideoDurationInCourse(1) AS TotalVideoMinutes;
