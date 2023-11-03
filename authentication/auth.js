import jwt from "jsonwebtoken";

export default function checkToken(req, res, next) {
    // bypass login, register
    // console.log("request url: " + req.url);

    if (
        req.url == "/refresh" ||
        req.url == "/user/login" ||
        req.url == "/user/logout" ||
        req.url == "/user/register" ||
        req.url == "/movie/all" ||
        req.url == "/ticket/all" ||
        req.url == "/user/all" ||
        req.url.indexOf("/public/assets") != -1 ||
        req.url.indexOf("showtime") != -1
    ) {
        next();
        return;
    }

    const accessToken = req.headers?.authorization?.split(" ")[1];

    // if (req.url != "/user/login") {
    //     const cookies = req.cookies;
    //     if (!cookies?.jwt) {
    //         res.status(403).send({
    //             message: "Forbidden",
    //         });
    //     }
    // }

    try {
        const jwtObject = jwt.decode(accessToken, process.env.JWT_SECRET);
        const isExpired = Date.now() >= jwtObject.exp * 1000;

        if (isExpired) {
            res.status(403).send({
                message: "Forbidden",
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
}
