INSERT INTO [dbo].[ShowTime_List]
    (
        [ID],
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
        @ID,
        @ShowTime_ID,
        @Movie_ID,
		@Date,
	    @Start_Time,
        @End_Time,
        @Run_Time,
        0
    )
SELECT  [ID],
        [ShowTime_ID],
        [Movie_ID],
		[Date],
        [Start_Time],
		[End_Time],
        [Run_Time]
FROM [dbo].[ShowTime_List]
WHERE [ID] = @ID