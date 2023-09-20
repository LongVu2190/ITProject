INSERT INTO [dbo].[ShowTime_List]
    (
        [ShowTime_ID],
        [Movie_ID],
		[Date],
        [Start_Time],
        [End_Time],
        [Run_Time],
        [Current_Quantity]
    )
VALUES 
    (
        @ShowTime_ID,
        @Movie_ID,
		@Date,
	    @Start_Time,
        @End_Time,
        @Run_Time,
        0
    )
SELECT  [ShowTime_ID],
        [Movie_ID],
		[Date],
        [Start_Time],
		[End_Time],
        [Run_Time]
FROM [dbo].[ShowTime_List]
WHERE [ShowTime_ID] = @ShowTime_ID