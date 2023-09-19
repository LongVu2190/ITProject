INSERT INTO [dbo].[ShowTime_List]
    (
        [ShowTime_ID],
        [Movie_ID],
		[Date],
		[Picture_URL],
        [Start_Time]
    )
VALUES 
    (
        @ShowTime_ID,
        @Movie_ID,
		@Date,
		@Picture_URL
    )