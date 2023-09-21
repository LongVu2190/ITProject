INSERT INTO [dbo].[Ticket_List]
    (
        [UserName],
        [ShowTime_ID],
		[Seat_Number]
    )
VALUES 
    (
        @UserName,
        @ShowTime_ID,
		@Seat_Number
    )

SELECT  [UserName],
        [ShowTime_ID],
		[Seat_Number]
FROM [dbo].[Ticket_List]
WHERE [ShowTime_ID] = @ShowTime_ID and
      [Seat_Number] = @Seat_Number
    