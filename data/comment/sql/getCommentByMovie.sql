SELECT  cm.[commentId],
		tk.[accountId],
		ac.[nickName],
		cm.[ratingPoint],
		cm.[comment]
FROM [dbo].[User_Comment] cm 	inner join [dbo].[Ticket_List] tk on cm.ticketId = tk.ticketId
							 	inner join [dbo].[ShowTime_List] st on tk.showTimeId = st.showTimeId
								inner join [dbo].[Movie_List] mv on st.movieId = mv.movieId
							    inner join [dbo].[User_Account] ac on ac.accountId = tk.accountId
WHERE mv.[movieId] = @movieId