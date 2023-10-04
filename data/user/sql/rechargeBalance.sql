UPDATE [dbo].[User_Account]
SET [balance] = [balance] + @recharge
WHERE [accountId] = @accountId

SELECT  [accountId],
        [userName],
        [nickName],
        [email],
        [balance]
FROM [dbo].[User_Account]
WHERE [accountId] = @accountId