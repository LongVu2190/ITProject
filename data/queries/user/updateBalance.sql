UPDATE [dbo].[User_Account]
SET [Balance] = @Balance
WHERE [Account_ID] = @Account_ID

SELECT *
FROM [dbo].[User_Account]
WHERE [Account_ID] = @Account_ID