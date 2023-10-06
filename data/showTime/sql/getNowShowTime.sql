SELECT 	DISTINCT
		st.movieId,
		mv.title,
		mv.cost,
		mv.genre,
		mv.runTime,
		mv.thumbnail,
		mv.region
FROM [dbo].[ShowTime_List] st inner join [dbo].[Movie_List] mv on st.movieId = mv.movieId
WHERE st.[showingDate] >= CAST( GETDATE() AS Date )