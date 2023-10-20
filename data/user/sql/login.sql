SELECT  [accountId],
        [username],
        [password]
FROM [dbo].[User_Account]
WHERE [email] = @email