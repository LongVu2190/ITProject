INSERT INTO [dbo].[Movie_List]
    (
        [Movie_ID],
        [Movie_Title],
		[Movie_Cost],
		[Picture_URL]
    )
VALUES 
    (
        @Movie_ID,
        @Movie_Title,
		@Movie_Cost,
		@Picture_URL
    )