SELECT  cm.[Comment_ID],
		tk.[Account_ID],
		ac.[NickName],
		cm.[Rating_Point],
		cm.[Comment]
FROM [dbo].[User_Comment] cm 	inner join [dbo].[Ticket_List] tk on cm.Ticket_ID = tk.Ticket_ID
							 	inner join [dbo].[ShowTime_List] st on tk.ShowTime_ID = st.ShowTime_ID
								inner join [dbo].[Movie_List] mv on st.Movie_ID = mv.Movie_ID
							    inner join [dbo].[User_Account] ac on ac.Account_ID = tk.Account_ID
WHERE mv.[Movie_ID] = @Movie_ID