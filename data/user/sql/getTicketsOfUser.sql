SELECT mv.title,
				mv.genre,
				mv.region,
				mv.cost,
				st.showingDate,
				st.startTime,
				st.endTime,
				tk.seatNumber				
FROM Ticket_List tk INNER JOIN ShowTime_List st ON tk.showTimeId = st.showTimeId
			INNER JOIN Movie_List mv on st.movieId = mv.movieId
WHERE accountId = @accountId