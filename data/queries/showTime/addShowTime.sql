INSERT INTO [dbo].[ShowTime_List]
    (
        [ShowTime_ID],
        [Movie_ID],
		[Date],
        [Start_Time],
        [Current_Quantity]
    )
VALUES 
    (   @ShowTime_ID,
        @Movie_ID,
		@Date,
	    @Start_Time,
        0
    )
SELECT  *
FROM [dbo].[ShowTime_List]
WHERE [ShowTime_ID] = @ShowTime_ID