UPDATE [dbo].[User_Account]
SET [balance] = [balance] + @recharge
WHERE [accountId] = @accountId

SELECT  [accountId],
        [username],
        [nickName],
        [email],
        [balance]
FROM [dbo].[User_Account]
WHERE [accountId] = @accountId