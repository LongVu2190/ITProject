INSERT INTO [dbo].[User_Comment]
    (
        [Ticket_ID],
        [Rating_Point],
		[Comment]
    )
VALUES 
    (
        @Ticket_ID,
        @Rating_Point,
		@Comment
    )

SELECT  [Ticket_ID],
        [Rating_Point],
		[Comment]
FROM [dbo].[User_Comment]
WHERE [Ticket_ID] = @Ticket_ID
    