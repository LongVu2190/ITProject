INSERT INTO [dbo].[User_Account]
    (
        [accountId],
        [userName],
        [password],
		[nickName],
        [email],
		[balance]
    )
VALUES 
    (
        @accountId,
        @userName,
        @password,
		@nickName,
        @email,
		0
    )

SELECT  *
FROM [dbo].[User_Account]
WHERE [accountId] = @accountId