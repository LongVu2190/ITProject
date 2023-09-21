INSERT INTO [dbo].[Ticket_List]
    (
        [ID],
        [UserName],
        [ShowTime_ID],
		[Seat_Number]
    )
VALUES 
    (
        @ID
        @UserName,
        @ShowTime_ID,
		@Seat_Number
    )

SELECT  [ID],
        [UserName],
        [ShowTime_ID],
		[Seat_Number]
FROM [dbo].[Ticket_List]
WHERE [ID] = @ID
    