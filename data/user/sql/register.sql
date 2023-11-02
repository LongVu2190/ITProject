INSERT INTO [dbo].[User_Account]
    (
        [accountId],
        [username],
        [password],
		[nickname],
        [email],
		[balance]
    )
VALUES 
    (
        @accountId,
        @username,
        @password,
		@nickname,
        @email,
		0
    )

SELECT  *
FROM [dbo].[User_Account]
WHERE [accountId] = @accountId