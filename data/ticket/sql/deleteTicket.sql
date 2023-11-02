SELECT mv.cost
FROM [dbo].[Ticket_List] tk INNER JOIN [dbo].[ShowTime_List] st on tk.showTimeId = st.showTimeId INNER JOIN [dbo].[Movie_List] mv on st.movieId = mv.movieId
WHERE tk.ticketId = @ticketId

DELETE [dbo].[Ticket_List]
WHERE [ticketId] = @ticketId