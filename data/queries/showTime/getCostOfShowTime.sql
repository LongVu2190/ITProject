SELECT mv.Cost
FROM [dbo].[Movie_List] mv inner join [dbo].[ShowTime_List] st on mv.Movie_ID = st.Movie_ID
WHERE st.ShowTime_ID = @ShowTime_ID