USE [master]
GO
CREATE DATABASE [LetterService]
Go
USE [LetterService]
GO
CREATE TABLE [Users]
(
	Id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	Email NVARCHAR(30) NOT NULL,
	[Password] CHAR(97) NOT NULL,
	[Role] INT NOT NULL
)
GO
CREATE TABLE [Letters]
(
	Id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	PostTime DATETIME NOT NULL,
	[Topic] NVARCHAR(50) NOT NULL,
	[Body] NVARCHAR(1000) NOT NULL,
	IsPosted BIT NOT NULL,
	CreationTime DATETIME NOT NULL,
	[UserId] INT NOT NULL REFERENCES [Users] (Id)
)
Go
INSERT INTO [Users] ([Email], [Password], [Role])
VALUES
(
	'lvvm253@gmail.com',
	'E24FECBB80B33722CDFF42A63635555F2E1EAB5AC9F7FB28BA07F61A3D29DF27:D0AB4E3D13A15CE460D6D7AD14E7DBAD',
	0
),
(
	'svyatyar2@gmail.com',
	'876D3217CF513A3DBB02FF508FDB5CB2CA73BC3D693C443AB58D650A15999091:848EBCA5921031993602CA04FDE369AE',
	1
);

INSERT INTO [Letters] (PostTime, [Topic], [Body], IsPosted, CreationTime, UserId)
VALUES
(
	DATEADD(hour,2,GETDATE()),
	'Study',
	'What about study aboroad? Intresting?',
	0,
	GETDATE(),
	1
),
(
	DATEADD(hour,2,GETDATE()),
	'OOldStudy',
	'What about old study? Intresting?',
	1,
	GETDATE(),
	1
),
(
	DATEADD(hour,5,GETDATE()),
	'Secret message',
	'Hello i have secret messagge for you!!',
	0,
	GETDATE(),
	2	
),
(
	DATEADD(hour,2,GETDATE()),
	'Old serets Now',
	'You know that old secret not secret?',
	1,
	GETDATE(),
	2
);