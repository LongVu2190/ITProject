select showTimeId,
        movieId,
        CONVERT(VARCHAR, showingDate, 23) AS showingDate,
        CONVERT(VARCHAR, startTime, 108) AS startTime,
        CONVERT(VARCHAR, endTime, 108) AS endTime
from ShowTime_List