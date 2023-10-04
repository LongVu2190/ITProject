INSERT INTO [dbo].[ShowTime_List]
    (
        [showTimeId],
        [movieId],
		[showingDate],
        [startTime],
        [currentQuantity]
    )
VALUES 
    (   @showTimeId,
        @movieId,
		@showingDate,
	    @startTime,
        0
    )
    
SELECT  *
FROM [dbo].[ShowTime_List]
WHERE [showTimeId] = @showTimeId