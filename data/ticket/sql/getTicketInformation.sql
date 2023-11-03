SELECT mv.cost, st.showingDate
FROM [dbo].[Ticket_List] tk INNER JOIN [dbo].[ShowTime_List] st on tk.showTimeId = st.showTimeId INNER JOIN [dbo].[Movie_List] mv on st.movieId = mv.movieId
WHERE tk.ticketId = @ticketId and st.showingDate > CAST( GETDATE() AS Date )