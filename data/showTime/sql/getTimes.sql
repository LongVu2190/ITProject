SELECT  st.showTimeId,
        mv.movieId,
        mv.title,
        mv.genre,
        mv.thumbnail,
		st.showingDate,
        CONVERT(VARCHAR, st.startTime, 108) as startTime,
        CONVERT(VARCHAR, st.endTime, 108) as endTime
FROM [dbo].[ShowTime_List] st inner join [dbo].[Movie_List] mv on st.movieId = mv.movieId
WHERE st.[showingDate] >= CAST( GETDATE() AS Date ) AND mv.movieId = '32e869oTz815Z0k2gEsH'