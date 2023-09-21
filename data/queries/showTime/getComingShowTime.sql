SELECT 	st.[ID],
		[ShowTime_ID],
		[Title],
		[Cost],
		[Genre],
		[Thumbnail],
		[Date],
		[Start_Time],
		[End_Time],
		[Run_Time],
		[Current_Quantity]
FROM [dbo].Movie_List mv inner join [dbo].ShowTime_List st on mv.Movie_ID = st.Movie_ID 
WHERE st.[Date] > GETDATE()