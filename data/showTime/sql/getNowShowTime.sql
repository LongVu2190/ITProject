SELECT 	DISTINCT
		st.movieId,
		mv.title,
		mv.cost,
		mv.genre,
		LTRIM(DATEDIFF(MINUTE, 0, mv.runTime)) as runTime,
		mv.thumbnail,
		mv.region
FROM [dbo].[ShowTime_List] st inner join [dbo].[Movie_List] mv on st.movieId = '32e869oTz815Z0k2gEsH'
WHERE st.[showingDate] >= CAST( GETDATE() AS Date )