UPDATE [dbo].[User_Account]
SET [refreshToken] = @refreshToken
WHERE [accountId] = @accountId