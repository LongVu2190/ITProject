INSERT INTO [dbo].[Movie_List]
    (
        [Movie_ID],
        [Title],
		[Cost],
        [Genre],
        [Region],
        [Run_Time],
		[Thumbnail]
    )
VALUES 
    (
        @Movie_ID,
        @Title,
		@Cost,
        @Genre,
        @Region,
        @Run_Time,
		@Thumbnail
    )

SELECT  *
FROM [dbo].[Movie_List]
WHERE [Movie_ID] = @Movie_ID