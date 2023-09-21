INSERT INTO [dbo].[User_Comment]
    (
        [ID],
        [Ticket_ID],
        [Rating_Point],
		[Comment]
    )
VALUES 
    (
        @ID,
        @Ticket_ID,
        @Rating_Point,
		@Comment
    )

SELECT  [ID],
        [Ticket_ID],
        [Rating_Point],
		[Comment]
FROM [dbo].[User_Comment]
WHERE [ID] = @ID
    