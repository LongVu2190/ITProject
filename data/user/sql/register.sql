INSERT INTO [dbo].[User_Account]
    (
        [accountId],
        [username],
        [password],
		[nickName],
        [email],
		[balance]
    )
VALUES 
    (
        @accountId,
        @username,
        @password,
		@nickName,
        @email,
		0
    )

SELECT  *
FROM [dbo].[User_Account]
WHERE [accountId] = @accountId