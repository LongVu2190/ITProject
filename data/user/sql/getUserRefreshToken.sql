SELECT  [accountId],
        [username]
FROM [dbo].[User_Account]
WHERE [refreshToken] = @refreshToken