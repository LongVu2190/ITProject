import jwt from "jsonwebtoken";

export default function checkToken(req, res, next) {
    // bypass login, register
    console.log("request url: " + req.url);

    if (req.url == '/user/login' || req.url == '/user/register' || req.url == '/ticket' || req.url == '/user/w2TeJ496XDI07tI412D2' ||
    req.url.indexOf('/public/assets') != -1 || req.url.indexOf('showtime') != -1 && req.url != '/showtime/add' ) {
        next();
        return;
    }
    
    const token = req.headers?.authorization?.split(" ")[1]
   
    try {
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET);
        const isExpired = Date.now() >= jwtObject.exp * 1000;

        if (isExpired) {
            res.end();
            return {
                message: "Token is expired"
            }
        }
        else {
            next();
            return;
        }

    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
}