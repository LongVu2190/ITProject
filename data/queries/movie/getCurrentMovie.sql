SELECT 	mv.[ID],
		mv.[Movie_ID],
		mv.[Title],
		mv.[Cost],
		mv.[Genre],
		mv.[Thumbnail]
FROM [dbo].[Movie_List] mv inner join [dbo].[ShowTime_List] st on mv.Movie_ID = st.Movie_ID
WHERE st.[Date] >= GETDATE()