INSERT INTO [dbo].[User_Account]
    (
        [UserName],
        [Password],
		[NickName],
        [Email],
		[Balance]
    )
VALUES 
    (
        @UserName,
        @Password,
		@NickName,
        @Email,
		0
    )

SELECT  [UserName],
        [Password],
		[NickName],
        [Email],
		[Balance]
FROM [dbo].[User_Account]
WHERE [UserName] = @UserName