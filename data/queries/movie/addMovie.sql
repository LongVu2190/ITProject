INSERT INTO [dbo].[Movie_List]
    (
        [Movie_ID],
        [Movie_Title],
		[Movie_Cost],
        [Genre],
		[Thumbnail]
    )
VALUES 
    (
        @Movie_ID,
        @Movie_Title,
		@Movie_Cost,
        @Genre,
		@Thumbnail
    )

SELECT  [Movie_ID],
        [Movie_Title],
        [Movie_Cost],
        [Genre],
        [Thumbnail]
FROM [dbo].[Movie_List]
WHERE [Movie_ID] = @Movie_ID