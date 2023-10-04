UPDATE [dbo].[User_Account]
SET [balance] = [balance] - @totalCost
WHERE [accountId] = @accountId

SELECT *
FROM [dbo].[User_Account]
WHERE [accountId] = @accountId