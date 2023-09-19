INSERT INTO [dbo].[ShowTime_List]
    (
        [ShowTime_ID],
        [Movie_ID],
		[Date],
        [Start_Time],
        [End_Time],
        [Current_Quantity]
    )
VALUES 
    (
        @ShowTime_ID,
        @Movie_ID,
		@Date,
	    @Start_Time,
        @End_Time,
        0
    )