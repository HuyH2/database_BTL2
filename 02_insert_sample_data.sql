USE BTL2_DATABASE;
GO

--1
INSERT INTO ORGANIZATION (Name, Address, Phone, Email, TaxID, Website)
VALUES
(N'Green Academy', N'123 Lê Lợi, Q.1, TP.HCM', '0987654321', 'info@greenacademy.vn', 'TAX001', 'greenacademy.vn'),
(N'BlueTech Edu', N'45 Nguyễn Huệ, Q.1', '0909123123', 'contact@bluetech.com', 'TAX002', 'bluetech.com'),
(N'Skyline Learning', N'56 Trần Phú, Hà Nội', '0988111222', 'admin@skyline.vn', 'TAX003', 'skyline.vn'),
(N'Sunrise School', N'10 Cộng Hòa, Tân Bình', '0919888777', 'hello@sunrise.edu', 'TAX004', 'sunrise.edu.vn'),
(N'Nova Academy', N'88 Pasteur, Q.3', '0939111222', 'support@novaacademy.vn', 'TAX005', 'novaacademy.vn');

--2
INSERT INTO USER_ACCOUNT (UserName, Email, UserPassword, Gender, DateOfBirth, Status, OrganizationID)
VALUES
(N'Nguyen Van A', 'a@greenacademy.vn', '123456', 'M', '1995-06-20', N'Active', 1),
(N'Tran Thi B', 'b@greenacademy.vn', 'abc123', 'F', '2007-10-10', N'Active', 1),
(N'Le Minh C', 'c@bluetech.com', 'pass789', 'M', '2002-03-05', N'Inactive', 2),
(N'Pham Quynh D', 'd@skyline.vn', 'hello123', 'F', '1990-12-01', N'Active', 3),
(N'Hoang Khang E', 'e@novaacademy.vn', 'mypw123', 'M', '1988-05-14', N'Active', 5);


--3
INSERT INTO SSO (Provider, SaveIn, UserID)
VALUES
(N'Google', 'token_1', 1),
(N'Facebook', 'token_2', 2),
(N'LinkedIn', 'token_3', 3),
(N'Github', 'token_4', 4),
(N'Google', 'token_5', 5);



--4 
INSERT INTO STUDENT (UserID, Major, Education_Level)
VALUES
(1, N'Computer Science', N'Undergraduate'),
(2, N'Information Systems', N'High School'),
(3, N'Artificial Intelligence', N'Undergraduate'),
(4, N'Cybersecurity', N'Graduate'),
(5, N'Software Engineering', N'Graduate');


--5
INSERT INTO INSTRUCTOR (UserID, Expertise, Bio, Qualification)
VALUES
(1, N'Python, Data Science', N'8 năm kinh nghiệm và phân tích dữ liệu', N'MSc in Data Science'),
(3, N'Game Design, Unity', N'Giảng viên game engine tại BKU', N'MEng in Software Engineering'),
(4, N'ML, AI Ethics', N'Tác giả nhiều nghiên cứu AI', N'PhD in AI'),
(5, N'Web Development', N'Trainer về React và NodeJS', N'MSc in Computer Science'),
(2, N'UI/UX', N'Giảng viên thiết kế giao diện', N'BA in Digital Design');



--6
INSERT INTO ADMIN (UserID, Role, Permission_Level)
VALUES
(1, N'Super Admin', N'Full'),
(3, N'Moderator', N'Medium'),
(4, N'Staff', N'Limited'),
(5, N'Course Manager', N'Medium'),
(2, N'Support', N'Low');



--7
INSERT INTO GUARDIAN (Name, Email, Phone)
VALUES
(N'Pham Thi Lan', 'lan.parent@gmail.com', '0911000111'),
(N'Nguyen Van Nam', 'nam.parent@gmail.com', '0922333444'),
(N'Le Thi Hoa', 'hoa.parent@gmail.com', '0988111222'),
(N'Hoang Duc Long', 'long.parent@gmail.com', '0909333222'),
(N'Phan Quang Huy', 'huy.parent@gmail.com', '0909888777');



--8
INSERT INTO COURSE (Name, Description, Category, Language, Price, Duration, InstructorID)
VALUES
(N'Introduction to Python', N'Học Python cơ bản đến nâng cao', N'Programming', N'English', 1000000, 30, 1),
(N'Game Design 101', N'Thiết kế game cơ bản với Unity', N'Game Dev', N'English', 2000000, 45, 3),
(N'AI Foundations', N'Học về trí tuệ nhân tạo', N'AI', N'English', 2500000, 60, 4),
(N'Frontend Web', N'Học HTML, CSS, JS và React', N'Web Dev', N'English', 1800000, 40, 5),
(N'Data Analysis', N'Xử lý và trực quan hóa dữ liệu', N'Data', N'English', 2200000, 50, 1);



--9
INSERT INTO LESSON (Lesson_No, Process_Pct, CourseID)
VALUES
(1, 10, 1),
(2, 20, 1),
(1, 10, 2),
(2, 20, 2),
(1, 15, 3);


--10
INSERT INTO CONTENT_ITEM (Title, Description, LessonID)
VALUES
(N'Intro Video', N'Giới thiệu khóa học Python', 1),
(N'Loop Practice', N'Bài tập vòng lặp', 2),
(N'Game Prototype', N'Thực hành tạo game đầu tiên', 3),
(N'HTML Basics', N'Bài giảng đầu tiên về HTML', 4),
(N'AI History', N'Lịch sử AI hiện đại', 5);

--11
INSERT INTO VIDEO (ContentID, Duration, Resolution)
VALUES
(1, 15, N'1080p'),
(2, 20, N'720p'),
(3, 30, N'1080p'),
(4, 25, N'720p'),
(5, 40, N'1080p');



--12
INSERT INTO QUIZZ (ContentID, NumberOfQuestion, PassingScore, MaxAttempts)
VALUES
(1, 10, 60, 3),
(2, 8, 50, 2),
(3, 15, 70, 3),
(4, 5, 80, 2),
(5, 12, 75, 3);



--13
INSERT INTO DOCUMENT (ContentID, FileURL, Format)
VALUES
(1, N'https://cdn.edu/python_guide.pdf', N'PDF'),
(2, N'https://cdn.edu/loop_examples.docx', N'DOCX'),
(3, N'https://cdn.edu/unity_tutorial.pdf', N'PDF'),
(4, N'https://cdn.edu/html_guide.pdf', N'PDF'),
(5, N'https://cdn.edu/ai_notes.docx', N'DOCX');


--14
INSERT INTO CERTIFICATE (StudentID, CourseID)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);



--15
INSERT INTO FORUM (Name, Description, CreatorID)
VALUES
(N'Python Discussion', N'Nơi thảo luận khóa học Python', 1),
(N'Unity Forum', N'Trao đổi kinh nghiệm game dev', 3),
(N'AI Talk', N'Bàn luận về AI Ethics', 4),
(N'Frontend Club', N'HTML, CSS, JS', 5),
(N'Data Science', N'Học viên cùng chia sẻ project', 1);



--16
INSERT INTO POST (ForumID, AuthorID, Content)
VALUES
(1, 1, N'Mọi người có thầy bài tập vòng l?p khó không?'),
(1, 2, N'Tôi mới hoàn thành quiz 1 rồi!'),
(2, 3, N'Unity export bị lỗi build scene, ai giúp v?i!'),
(3, 4, N'Mình đang đọc về bias trong dữ liệu AI.'),
(5, 1, N'Ai có dataset nào hay share nhé!');



--17
INSERT INTO USER_ORGANIZATION (UserID, OrganizationID, Status)
VALUES
(1,1,N'Active'),
(2,1,N'Active'),
(3,2,N'Active'),
(4,3,N'Active'),
(5,5,N'Inactive');




--18
INSERT INTO ADMIN_SUPERVISE (AdminID, StudentID)
VALUES
(1,2),
(1,3),
(3,4),
(4,5),
(5,1);



--19
INSERT INTO STUDENT_GUARDIAN (StudentID, GuardianID)
VALUES
(2,1),
(3,2),
(4,3),
(1,4),
(5,5);




--20
INSERT INTO STUDENT_COURSE (StudentID, CourseID, Payment, Progress)
VALUES
(1,1,1000000,100),
(2,2,2000000,60),
(3,3,2500000,40),
(4,4,1800000,20),
(5,5,2200000,80);



--21
INSERT INTO QUIZZ_RESULT (StudentID, ContentID, AttemptCount, Score)
VALUES
(1,1,2,90),
(2,2,1,70),
(3,3,1,85),
(4,4,3,60),
(5,5,2,95);


--22
INSERT INTO DOCUMENT_DOWNLOAD (StudentID, ContentID)
VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5);


--23
INSERT INTO USER_FORUM_JOIN (UserID, ForumID, Role, Permission_Level)
VALUES
(1,1,N'Member',N'Normal'),
(2,1,N'Member',N'Normal'),
(3,2,N'Admin',N'High'),
(4,3,N'Member',N'Normal'),
(5,5,N'Moderator',N'High');



--24
INSERT INTO USER_FORUM_MOD (UserID, ForumID, Role)
VALUES
(1,1,N'Moderator'),
(3,2,N'Moderator'),
(4,3,N'Moderator'),
(5,4,N'Moderator'),
(1,5,N'Instrutor');
