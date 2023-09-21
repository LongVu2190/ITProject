UPDATE [dbo].[User_Account]
SET [Balance] = @Balance
WHERE [ID] = @ID

SELECT  [UserName],
        [Password],
				[NickName],
        [Email],
				[Balance]
FROM [dbo].[User_Account]
WHERE [ID] = @ID