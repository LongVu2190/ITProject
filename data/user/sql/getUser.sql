SELECT  [username],
        [nickname],
        [email],
        [balance]
FROM [dbo].[User_Account]
WHERE [accountId] = @accountId