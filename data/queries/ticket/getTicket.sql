SELECT [ID]
FROM [dbo].[Ticket_List]
WHERE   [ShowTime_ID] = @ShowTime_ID and
        [Seat_Number] = @Seat_Number