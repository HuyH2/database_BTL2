USE BTL2;
Go

SELECT * FROM ORGANIZATION;
SELECT * FROM USER_ACCOUNT;
SELECT * FROM USER_FORUM_MOD;


INSERT INTO ORGANIZATION (Name, Address, Phone, Email, TaxID, Website)
VALUES
('Tech Academy', '123 Main St', '0987654321', 'contact@techacademy.com', 'TAX001', 'techacademy.com'),
('EduGlobal', '45 Green Road', '0911222333', 'info@eduglobal.org', 'TAX002', 'eduglobal.org'),
('Quantum School', '89 Future Ave', '0933445566', 'admin@quantum.edu', 'TAX003', 'quantum.edu'),
('Sky Learning', '12 Cloud Street', '0977889922', 'support@skylearn.com', 'TAX004', 'skylearn.com'),
('Infinity Education', '77 Horizon Blvd', '0909090909', 'hello@infinity.edu', 'TAX005', 'infinity.edu');


INSERT INTO USER_ACCOUNT (UserName, Email, UserPassword, Gender, DateOfBirth, Status, OrganizationID)
VALUES
('Alice Nguyen', 'alice@mail.com', 'pass123', 'F', '2000-05-10', 'Active', 1),
('Bob Tran', 'bob@mail.com', 'pass123', 'M', '1999-01-15', 'Active', 2),
('Charlie Pham', 'charlie@mail.com', 'pass123', 'M', '1990-07-20', 'Active', 3),
('Diana Le', 'diana@mail.com', 'pass123', 'F', '2001-11-30', 'Active', 4),
('Eric Vo', 'eric@mail.com', 'pass123', 'M', '1998-02-14', 'Active', 5),

('Fiona Do', 'fiona@mail.com', 'pass123', 'F', '2000-09-08', 'Active', 1),
('George Nguyen', 'george@mail.com', 'pass123', 'M', '1995-04-21', 'Active', 2),
('Helen Tran', 'helen@mail.com', 'pass123', 'F', '1997-10-12', 'Active', 3),
('Ivan Do', 'ivan@mail.com', 'pass123', 'M', '1999-05-22', 'Active', 4),
('Julia Pham', 'julia@mail.com', 'pass123', 'F', '2002-03-18', 'Active', 5),

('Kevin Le', 'kevin@mail.com', 'pass123', 'M', '1993-07-07', 'Active', 1),
('Lina Vu', 'lina@mail.com', 'pass123', 'F', '1996-12-09', 'Active', 2),
('Michael Lam', 'michael@mail.com', 'pass123', 'M', '1989-08-30', 'Active', 3),
('Nancy Ho', 'nancy@mail.com', 'pass123', 'F', '1994-04-04', 'Active', 4),
('Oscar Bui', 'oscar@mail.com', 'pass123', 'M', '1998-06-25', 'Active', 5);


INSERT INTO SSO (Provider, SaveIn, UserID)
VALUES
('Google', 'gmail', 1),
('Github', 'github', 3),
('Facebook', 'facebook', 5),
('Google', 'gmail', 6),
('Microsoft', 'outlook', 7);


INSERT INTO STUDENT VALUES
(1, 'Computer Science', 'Undergraduate'),
(2, 'Information Systems', 'Undergraduate'),
(3, 'Business Analytics', 'Undergraduate'),
(4, 'Data Science', 'Graduate'),
(5, 'Networking', 'Certificate');


INSERT INTO INSTRUCTOR VALUES
(6, 'Machine Learning', 'ML Instructor', 'MSc AI'),
(7, 'Cloud Computing', 'AWS Trainer', 'AWS-PRO'),
(8, 'Web Development', 'Full-stack 7 years', 'MSc IT'),
(9, 'Cybersecurity', 'Security Analyst', 'CEH'),
(10, 'Database Systems', 'DBA Expert', 'MCSA');


INSERT INTO ADMIN VALUES
(11, 'System Admin', 'High'),
(12, 'Content Admin', 'Medium'),
(13, 'Moderator Admin', 'Medium'),
(14, 'Support Admin', 'Low'),
(15, 'Quality Admin', 'Medium');


INSERT INTO GUARDIAN (Name, Email, Phone) VALUES
('Mr Long', 'long@mail.com', '0901112222'),
('Mrs Hoa', 'hoa@mail.com', '0903334444'),
('Ms Linh', 'linh@mail.com', '0905556666'),
('Mr Binh', 'binh@mail.com', '0907778888'),
('Mrs Yen', 'yen@mail.com', '0909991111');


INSERT INTO COURSE (Name, Description, Category, Language, Price, Duration, InstructorID)
VALUES
('Machine Learning 101', 'Intro to ML', 'AI', 'English', 99.99, 40, 6),
('Cloud Computing Basics', 'Intro to Cloud Infra', 'Cloud', 'English', 79.99, 30, 7),
('Web Development Bootcamp', 'HTML CSS JS', 'Web', 'Vietnamese', 49.99, 25, 8),
('Cybersecurity Essentials', 'Security fundamentals', 'Security', 'English', 120.00, 45, 9),
('SQL Mastery', 'Advanced SQL Training', 'Database', 'Vietnamese', 150.00, 50, 10);


INSERT INTO LESSON (Lesson_No, Process_Pct, CourseID)
VALUES
(1, 0, 1),
(1, 0, 2),
(1, 0, 3),
(1, 0, 4),
(1, 0, 5);


-- COURSE 1 — Machine Learning 101 (LessonID = 1)
INSERT INTO CONTENT_ITEM (Title, Description, LessonID)
VALUES
('ML Video 1', 'Intro to ML concepts', 1),
('ML Video 2', 'Supervised vs Unsupervised', 1),
('ML Video 3', 'Model evaluation methods', 1),

('ML Quiz 1', 'Quiz on ML basics', 1),
('ML Quiz 2', 'Quiz on supervised learning', 1),
('ML Quiz 3', 'Quiz on ML metrics', 1),

('ML Document 1', 'ML glossary', 1),
('ML Document 2', 'Regression notes', 1),
('ML Document 3', 'Classification notes', 1);

-- COURSE 2 — Cloud Basics (LessonID = 2)
INSERT INTO CONTENT_ITEM (Title, Description, LessonID)
VALUES
('Cloud Video 1', 'Intro to cloud', 2),
('Cloud Video 2', 'IaaS vs PaaS vs SaaS', 2),
('Cloud Video 3', 'Cloud deployment models', 2),

('Cloud Quiz 1', 'Cloud definition quiz', 2),
('Cloud Quiz 2', 'Services quiz', 2),
('Cloud Quiz 3', 'Cloud architecture quiz', 2),

('Cloud Document 1', 'Cloud definitions', 2),
('Cloud Document 2', 'Cloud services overview', 2),
('Cloud Document 3', 'Cloud models summary', 2);

-- COURSE 3 — Web Development (LessonID = 3)
INSERT INTO CONTENT_ITEM (Title, Description, LessonID)
VALUES
('Web Video 1', 'HTML introduction', 3),
('Web Video 2', 'CSS styling', 3),
('Web Video 3', 'Basic JavaScript', 3),

('Web Quiz 1', 'HTML quiz', 3),
('Web Quiz 2', 'CSS quiz', 3),
('Web Quiz 3', 'JavaScript quiz', 3),

('Web Document 1', 'HTML cheat sheet', 3),
('Web Document 2', 'CSS guide', 3),
('Web Document 3', 'JS primer', 3);

-- COURSE 4 — Cybersecurity (LessonID = 4)
INSERT INTO CONTENT_ITEM (Title, Description, LessonID)
VALUES
('Sec Video 1', 'What is cybersecurity?', 4),
('Sec Video 2', 'Common threats', 4),
('Sec Video 3', 'Security tools', 4),

('Sec Quiz 1', 'Cybersecurity fundamentals', 4),
('Sec Quiz 2', 'Threat recognition', 4),
('Sec Quiz 3', 'Tool knowledge quiz', 4),

('Sec Document 1', 'Security handbook', 4),
('Sec Document 2', 'Threat report', 4),
('Sec Document 3', 'Security tools list', 4);

-- COURSE 5 — SQL Mastery (LessonID = 5)
INSERT INTO CONTENT_ITEM (Title, Description, LessonID)
VALUES
('SQL Video 1', 'SQL overview', 5),
('SQL Video 2', 'JOIN operations', 5),
('SQL Video 3', 'Indexes and performance', 5),

('SQL Quiz 1', 'SQL basics quiz', 5),
('SQL Quiz 2', 'Join quiz', 5),
('SQL Quiz 3', 'Indexing quiz', 5),

('SQL Document 1', 'SQL reference', 5),
('SQL Document 2', 'Join guide', 5),
('SQL Document 3', 'Index tips', 5);


INSERT INTO VIDEO VALUES
(1, 10, '1080p'), (2, 12, '1080p'), (3, 15, '1080p'),
(10, 9, '720p'), (11, 11, '720p'), (12, 13, '720p'),
(19, 8, '1080p'), (20, 10, '1080p'), (21, 12, '1080p'),
(28, 11, '720p'), (29, 10, '720p'), (30, 14, '720p'),
(37, 14, '1080p'), (38, 16, '1080p'), (39, 18, '1080p');


INSERT INTO QUIZ (ContentID, Description, Number_Questions, PassingScore, MaxAttempts)
VALUES
(4, 'ML quiz 1', 10, 70, 3),
(5, 'ML quiz 2', 8, 60, 3),
(6, 'ML quiz 3', 12, 75, 3),

(13, 'Cloud quiz 1', 10, 65, 3),
(14, 'Cloud quiz 2', 8, 60, 3),
(15, 'Cloud quiz 3', 12, 70, 3),

(22, 'HTML quiz', 10, 70, 3),
(23, 'CSS quiz', 8, 60, 3),
(24, 'JavaScript quiz', 12, 70, 3),

(31, 'Cyber quiz 1', 10, 70, 3),
(32, 'Cyber quiz 2', 8, 60, 3),
(33, 'Cyber quiz 3', 12, 70, 3),

(40, 'SQL quiz 1', 10, 70, 3),
(41, 'SQL quiz 2', 8, 60, 3),
(42, 'SQL quiz 3', 12, 70, 3);


INSERT INTO DOCUMENT VALUES
(7, 'ml_doc1.pdf', 'pdf'),
(8, 'ml_doc2.pdf', 'pdf'),
(9, 'ml_doc3.pdf', 'pdf'),

(16, 'cloud_doc1.pdf', 'pdf'),
(17, 'cloud_doc2.pdf', 'pdf'),
(18, 'cloud_doc3.pdf', 'pdf'),

(25, 'web_doc1.pdf', 'pdf'),
(26, 'web_doc2.pdf', 'pdf'),
(27, 'web_doc3.pdf', 'pdf'),

(34, 'sec_doc1.pdf', 'pdf'),
(35, 'sec_doc2.pdf', 'pdf'),
(36, 'sec_doc3.pdf', 'pdf'),

(43, 'sql_doc1.pdf', 'pdf'),
(44, 'sql_doc2.pdf', 'pdf'),
(45, 'sql_doc3.pdf', 'pdf');


INSERT INTO CERTIFICATE VALUES
(1, 1, GETDATE()),
(2, 3, GETDATE()),
(3, 1, GETDATE()),
(4, 2, GETDATE()),
(5, 4, GETDATE());


INSERT INTO FORUM (Name, Description, CreatorID, CourseID)
VALUES
('ML Forum', 'Discuss ML topics', 6, 1),
('Cloud Forum', 'Cloud discussion', 7, 2),
('Web Forum', 'Web dev talk', 8, 3),
('Security Forum', 'Security topics', 9, 4),
('SQL Forum', 'SQL Q&A', 10, 5);


INSERT INTO POST (ForumID, AuthorID, Content)
VALUES
(1, 1, 'ML is fascinating!'),
(3, 2, 'Web dev is fun!'),
(1, 3, 'Supervised learning is cool!'),
(2, 4, 'Cloud is the future'),
(4, 5, 'Security is important!');


INSERT INTO USER_ORGANIZATION VALUES
(1,1,GETDATE(),'Member'),
(2,2,GETDATE(),'Member'),
(3,3,GETDATE(),'Member'),
(4,4,GETDATE(),'Member'),
(5,5,GETDATE(),'Member');


INSERT INTO ADMIN_SUPERVISE VALUES
(11,12,GETDATE()),
(11,13,GETDATE()),
(12,14,GETDATE()),
(13,15,GETDATE()),
(11,15,GETDATE());


INSERT INTO STUDENT_GUARDIAN VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5);


INSERT INTO STUDENT_COURSE VALUES
(1,1,99.99,10),
(2,3,49.99,0),
(3,1,99.99,25),
(4,2,79.99,5),
(5,4,120.50,0);


INSERT INTO QUIZ_RESULT VALUES
(1,4,1,80),   -- Student1 h?c course1 ? quiz course1
(2,22,1,70),  -- Student2 h?c course3 ? quiz course3
(3,5,1,75),   -- Student3 h?c course1
(4,14,1,65),  -- Student4 h?c course2
(5,31,1,85);  -- Student5 h?c course4


INSERT INTO DOCUMENT_DOWNLOAD VALUES
(1,7,GETDATE()),    -- course1
(2,25,GETDATE()),   -- course3
(3,8,GETDATE()),    -- course1
(4,16,GETDATE()),   -- course2
(5,34,GETDATE());   -- course4


INSERT INTO USER_FORUM_JOIN VALUES
(1,1,'Member','Low',GETDATE()),
(2,3,'Member','Low',GETDATE()),
(3,1,'Member','Low',GETDATE()),
(4,2,'Member','Low',GETDATE()),
(5,4,'Member','Low',GETDATE());


INSERT INTO USER_FORUM_MOD VALUES
(11,1,'Moderator',GETDATE()),
(12,2,'Moderator',GETDATE()),
(13,3,'Moderator',GETDATE()),
(14,4,'Moderator',GETDATE()),
(15,5,'Moderator',GETDATE());