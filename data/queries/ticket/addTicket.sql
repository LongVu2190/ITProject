INSERT INTO [dbo].[Ticket_List]
    (
        [Ticket_ID],
        [Account_ID],
        [ShowTime_ID],
		[Seat_Number]
    )
VALUES 
    (
        @Ticket_ID,
        @Account_ID,
        @ShowTime_ID,
		@Seat_Number
    )

SELECT  *
FROM [dbo].[Ticket_List]
WHERE [Ticket_ID] = @Ticket_ID
    