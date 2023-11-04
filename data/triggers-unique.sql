CREATE UNIQUE INDEX uq_Ticket_List
ON dbo.Ticket_List(ShowTime_ID, Seat_Number)

CREATE UNIQUE INDEX uq_User_Account_UserName
ON dbo.User_Account(UserName)

CREATE UNIQUE INDEX uq_User_Account_Email
ON dbo.User_Account(Email)

CREATE UNIQUE INDEX uq_Movie_List_Title
ON dbo.Movie_List(Title)

CREATE UNIQUE INDEX uq_ShowTime_DateTime
ON dbo.ShowTime_List(movieId, showingDate, startTime)

CREATE TRIGGER [dbo].[Tr_EndTime] on [dbo].[ShowTime_List]
AFTER INSERT, UPDATE
AS
BEGIN
	BEGIN TRANSACTION
	
	DECLARE @LEN time(7)
	DECLARE @ShowTime_ID nvarchar(50)
	DECLARE @Movie_ID nvarchar(50)

	SELECT @LEN = mv.Run_Time, @ShowTime_ID = st.ShowTime_ID, @Movie_ID = mv.Movie_ID
	FROM inserted st INNER JOIN Movie_List mv
	ON st.Movie_ID = mv.Movie_ID

	UPDATE ShowTime_List
	SET End_Time = CAST(DATEADD(SECOND, DATEDIFF(second, 0, @LEN), Start_Time) AS time(7))
	WHERE ShowTime_ID = @ShowTime_ID
	
	COMMIT TRANSACTION
END
