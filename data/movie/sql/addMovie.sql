INSERT INTO [dbo].[Movie_List]
    (
        [movieId],
        [Title],
		[cost],
        [genre],
        [region],
        [runTime],
		[thumbnail]
    )
VALUES 
    (
        @movieId,
        @Title,
		@cost,
        @genre,
        @region,
        @runTime,
		@thumbnail
    )

SELECT  *
FROM [dbo].[Movie_List]
WHERE [movieId] = @movieId