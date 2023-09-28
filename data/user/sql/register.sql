INSERT INTO [dbo].[User_Account]
    (
        [Account_ID],
        [UserName],
        [Password],
		[NickName],
        [Email],
		[Balance]
    )
VALUES 
    (
        @Account_ID,
        @UserName,
        @Password,
		@NickName,
        @Email,
		0
    )

SELECT  *
FROM [dbo].[User_Account]
WHERE [Account_ID] = @Account_ID