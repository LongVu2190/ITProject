SELECT  st.showTimeId,
        mv.movieId,
		CONVERT(VARCHAR, st.showingDate, 23) AS showingDate,
        CONVERT(VARCHAR, st.startTime, 108) AS startTime,
        CONVERT(VARCHAR, st.endTime, 108) AS endTime
FROM [dbo].[ShowTime_List] st inner join [dbo].[Movie_List] mv on st.movieId = mv.movieId
WHERE st.[showingDate] >= CAST( GETDATE() AS Date ) AND mv.movieId = @movieId