SELECT  st.showTimeId,
        mv.movieId,
        mv.title,
        mv.genre,
        mv.thumbnail,
		st.showingDate,
        st.startTime,
        st.endTime
FROM [dbo].[ShowTime_List] st inner join [dbo].[Movie_List] mv on st.movieId = mv.movieId
WHERE st.[showingDate] >= CAST( GETDATE() AS Date ) AND mv.movieId = @movieId