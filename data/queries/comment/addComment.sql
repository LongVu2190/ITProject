INSERT INTO [dbo].[User_Comment]
    (
        [Comment_ID],
        [Ticket_ID],
        [Rating_Point],
		[Comment]
    )
VALUES 
    (
        @Comment_ID,
        @Ticket_ID,
        @Rating_Point,
		@Comment
    )

SELECT *
FROM [dbo].[User_Comment]
WHERE [Comment_ID] = @Comment_ID
    