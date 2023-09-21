INSERT INTO [dbo].[Movie_List]
    (
        [ID],
        [Movie_ID],
        [Title],
		[Cost],
        [Genre],
		[Thumbnail]
    )
VALUES 
    (
        @ID,
        @Movie_ID,
        @Title,
		@Cost,
        @Genre,
		@Thumbnail
    )

SELECT  [ID],
        [Movie_ID],
        [Title],
        [Cost],
        [Genre],
        [Thumbnail]
FROM [dbo].[Movie_List]
WHERE [ID] = @ID