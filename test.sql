USE BTL2;
GO

------------------
--TEST TRIGGERS 1.1 
------------------

-- THÊM USER M?I Ð? TEST
INSERT INTO USER_ACCOUNT (UserName, Email, UserPassword, Gender, DateOfBirth, Status)
VALUES ('Test Role User', 'role_test@mail.com', '123', 'M', '2000-01-01', 'Active');

-- GI? S? USERID = 16 (l?y b?ng SELECT @@IDENTITY n?u c?n)
INSERT INTO STUDENT (UserID, Major, Education_Level)
VALUES (16, 'Computer Science', 'Undergraduate');


------------------
--TEST TRIGGERS 1.2 
------------------
INSERT INTO INSTRUCTOR (UserID, Expertise, Bio, Qualification)
VALUES (16, 'AI', 'Test Bio', 'MSc');


------------------
--TEST TRIGGERS 1.3 
-------------------- T?o thêm Instructor ð? test update
INSERT INTO USER_ACCOUNT (UserName, Email, UserPassword, Gender, DateOfBirth, Status)
VALUES ('Update Test', 'update_test@mail.com', '123', 'F', '1999-05-05', 'Active');

-- Gi? s? UserID = 17
INSERT INTO INSTRUCTOR (UserID, Expertise, Bio, Qualification)
VALUES (17, 'Cloud', 'Bio', 'Cert');

-- UPDATE c? ð?i UserID sang User ð? có role
UPDATE INSTRUCTOR
SET UserID = 16
WHERE UserID = 17;


--INSERT TEST
INSERT INTO USER_ACCOUNT (UserName, Email, UserPassword, Gender, DateOfBirth, Status)
VALUES ('Age Test', 'age_test@mail.com', 'abc', 'M', '1990-10-10', 'Active');

SELECT UserName, DateOfBirth, UserAge
FROM USER_ACCOUNT
WHERE Email = 'age_test@mail.com';


--UPDATE DOB TEST
UPDATE USER_ACCOUNT
SET DateOfBirth = '2005-01-01'
WHERE Email = 'age_test@mail.com';

SELECT UserName, DateOfBirth, UserAge
FROM USER_ACCOUNT
WHERE Email = 'age_test@mail.com';


--PROC Test--
EXEC sp_GetStudentsByMajor @Major = 'Computer Science';

EXEC sp_GetCourseStats @MinStudents = 1;
