SELECT 	tk.ticketId,
		mv.title,
		mv.genre,
		mv.region,
		mv.cost,
        CONVERT(VARCHAR, st.showingDate, 23) AS showingDate,
        CONVERT(VARCHAR, st.startTime, 108) AS startTime,
        CONVERT(VARCHAR, st.endTime, 108) AS endTime,
        CONVERT(VARCHAR, tk.purchaseDate, 23) AS purchaseDate,
		tk.seatNumber				
FROM Ticket_List tk INNER JOIN ShowTime_List st ON tk.showTimeId = st.showTimeId
			INNER JOIN Movie_List mv on st.movieId = mv.movieId
WHERE accountId = @accountId