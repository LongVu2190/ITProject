INSERT INTO [dbo].[User_Account]
    (
        [ID],
        [UserName],
        [Password],
		[NickName],
        [Email],
		[Balance]
    )
VALUES 
    (
        @ID,
        @UserName,
        @Password,
		@NickName,
        @Email,
		0
    )

SELECT  [ID],
        [UserName],
        [Password],
		[NickName],
        [Email],
		[Balance]
FROM [dbo].[User_Account]
WHERE [ID] = @ID