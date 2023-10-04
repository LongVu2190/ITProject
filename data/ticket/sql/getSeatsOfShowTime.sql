SELECT tk.[seatNumber]
FROM [dbo].[Ticket_List] tk inner join [dbo].[ShowTime_List] st on tk.showTimeId = st.showTimeId
WHERE st.[showTimeId] = @showTimeId