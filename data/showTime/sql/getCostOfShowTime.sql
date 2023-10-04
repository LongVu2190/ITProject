SELECT mv.cost
FROM [dbo].[Movie_List] mv inner join [dbo].[ShowTime_List] st on mv.movieId = st.movieId
WHERE st.showTimeId = @showTimeId