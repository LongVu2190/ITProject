SELECT tk.[Seat_Number]
FROM [dbo].[Ticket_List] tk inner join [dbo].[ShowTime_List] st on tk.ShowTime_ID = st.ShowTime_ID
WHERE st.[ShowTime_ID] = @ShowTime_ID