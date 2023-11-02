select  movieId,
        title,
        cost,
        genre,
        region,
        CONVERT(VARCHAR, runTime, 108) AS runTime
from Movie_List