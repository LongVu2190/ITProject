INSERT INTO [dbo].[Ticket_List]
    (
        [ticketId],
        [accountId],
        [showTimeId],
		[seatNumber],
        [purchaseDate]
    )
VALUES 
    (
        @ticketId,
        @accountId,
        @showTimeId,
		@seatNumber,
        @purchaseDate
    )

SELECT  *
FROM [dbo].[Ticket_List]
WHERE [ticketId] = @ticketId
    