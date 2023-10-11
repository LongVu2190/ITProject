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
    
SELECT  [showTimeId],
        [movieId],
        CONVERT(VARCHAR, showingDate, 23) AS showingDate,
        CONVERT(VARCHAR, startTime, 108) AS startTime,
        CONVERT(VARCHAR, endTime, 108) AS endTime,
        [currentQuantity]
FROM [dbo].[ShowTime_List]
WHERE [showTimeId] = @showTimeId