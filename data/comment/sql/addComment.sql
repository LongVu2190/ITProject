INSERT INTO [dbo].[User_Comment]
    (
        [commentId],
        [ticketId],
        [ratingPoint],
		[comment]
    )
VALUES 
    (
        @commentId,
        @ticketId,
        @ratingPoint,
		@comment
    )

SELECT *
FROM [dbo].[User_Comment]
WHERE [commentId] = @commentId
    