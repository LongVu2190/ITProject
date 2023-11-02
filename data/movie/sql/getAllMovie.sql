select  movieId,
        title,
        cost,
        genre,
        region,
        CONVERT(VARCHAR, runTime, 108) AS endTime
from Movie_List