import jwt from "jsonwebtoken";

export default function checkToken(req, res, next) {
    // bypass login, register
    console.log("request url: " + req.url);

    if (req.url == '/user/login' || req.url == '/user/register' || 
    req.url == '/showtime/coming' || req.url == '/showtime/now' ||
    req.url == '/showtime/32e869oTz815Z0k2gEsH') {

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