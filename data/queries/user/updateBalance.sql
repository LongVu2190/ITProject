UPDATE [dbo].[User_Account]
SET [Balance] = @Balance
WHERE [UserName] = @UserName

SELECT  [UserName],
        [Password],
				[NickName],
        [Email],
				[Balance]
FROM [dbo].[User_Account]
WHERE [UserName] = @UserName