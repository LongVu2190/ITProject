SELECT  cm.[ID],
	    tk.[UserName],
	    cm.[Rating_Point],
		cm.[Comment],
		st.[Movie_ID]
FROM [dbo].[User_Comment] cm inner join [dbo].[Ticket_List] tk on cm.Ticket_ID = tk.ID
							 inner join [dbo].[ShowTime_List] st on tk.ShowTime_ID = st.ShowTime_ID
							 inner join [dbo].[Movie_List] mv on st.Movie_ID = mv.Movie_ID
WHERE st.[Movie_ID] = @Movie_ID