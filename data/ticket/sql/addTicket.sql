INSERT INTO [dbo].[Ticket_List]
    (
        [ticketId],
        [accountId],
        [showTimeId],
		[seatNumber]
    )
VALUES 
    (
        @ticketId,
        @accountId,
        @showTimeId,
		@seatNumber
    )

SELECT  *
FROM [dbo].[Ticket_List]
WHERE [ticketId] = @ticketId
    