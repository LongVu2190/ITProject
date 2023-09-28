SELECT 	st.ShowTime_ID,
				st.Movie_ID,
				st.Date,
				st.Start_Time,
				st.End_Time,
				mv.Title,
				mv.Cost,
				mv.Genre,
				mv.Run_Time,
				mv.Thumbnail,
				mv.Region
FROM [dbo].[ShowTime_List] st inner join [dbo].[Movie_List] mv on st.Movie_ID = mv.Movie_ID
WHERE st.[Date] >= CAST( GETDATE() AS Date )