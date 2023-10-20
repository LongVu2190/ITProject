import jwt from "jsonwebtoken";

export default function checkToken(req, res, next) {
  // bypass login, register
  console.log("request url: " + req.url);

  if (
    req.url == "/user/login" ||
    req.url == "/user/register" ||
    req.url == "/ticket" ||
    req.url == "/user/w2TeJ496XDI07tI412D2" ||
    req.url == "/user/w2TeJ496XDI07tI412D2/balance" ||
    req.url.indexOf("/public/assets") != -1 ||
    (req.url.indexOf("showtime") != -1 && req.url != "/showtime/add")
  ) {
    next();
    return;
  }

  const accessToken = req.headers?.authorization?.split(" ")[1];

  try {
    const jwtObject = jwt.decode(accessToken, process.env.JWT_SECRET);
    const isExpired = Date.now() >= jwtObject.exp * 1000;

    console.log(jwtObject);
    console.log(isExpired);

    if (isExpired) {
      res.status(401).send({
        message: "Fobidden",
      });
    } else {
      next();
      return;
    }
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
  // try {
  //     // const jwtObject = jwt.verify(accessToken, process.env.JWT_SECRET);
  //     let exp = 0
  //     jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
  //         if (err) {
  //             res.status(403).send({
  //                 message: err.message
  //             });
  //         }
  //         exp = decoded.exp;
  //     });

  //     console.log(exp);
  //     const isExpired = Date.now() >= exp * 1000;

  //     if (isExpired) {
  //         // Access token has expired. Check for a refresh token.
  //         const refreshToken = req.headers?.authorization?.split(" ")[2];

    //         if (!refreshToken) {
    //             res.status(401).json({
    //                 message:
    //                     "Access token is expired, and no refresh token provided.",
    //             });
    //             return;
    //         }

    //         // Check if the refresh token is valid
    //         const refreshJwtObject = jwt.verify(
    //             refreshToken,
    //             process.env.REFRESH_JWT_SECRET
    //         );

  //         // Issue a new access token
  //         const newAccessToken = jwt.sign(user, process.env.JWT_SECRET, {
  //             expiresIn: "20s",
  //         });
  //         res.json({ accessToken: newAccessToken });
  //     } else {
  //         next();
  //     }
  // } catch (error) {
  //     if (error.name === 'TokenExpiredError') {
  //         console.log("11");
  //     } else {
  //         res.status(400).send({
  //             message: error.message
  //         });
  //     }
  //     res.status(400).json({ message: error.message });
  // }
  // try {
  //     const jwtObject = jwt.verify(token, process.env.JWT_SECRET);
  //     const isExpired = Date.now() >= jwtObject.exp * 1000;

  //     if (isExpired) {
  //         res.end();
  //         return {
  //             message: "Token is expired"
  //         }
  //     }
  //     else {
  //         next();
  //         return;
  //     }

  // } catch (error) {
  //     res.status(400).send({
  //         message: error.message
  //     })
  // }
}
