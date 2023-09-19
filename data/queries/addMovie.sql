INSERT INTO [dbo].[Movie_List]
    (
        [Movie_ID],
        [Movie_Title],
		[Movie_Cost],
		[Picture_URL]
    )
VALUES 
    (
        @Movie_ID,
        @Movie_Title,
		@Movie_Cost,
		@Picture_URL
    )

SELECT [Movie_ID],
        [Movie_Title],
		[Movie_Cost],
		[Picture_URL]
FROM [dbo].[Movie_List]
WHERE [Movie_ID] = @Movie_ID