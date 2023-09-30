export default function checkToken(req, res, next) {
    // bypass login. register
    console.log("request url: " + req.url);
    if (req.url == '/user/login' || req.url == '/user/register') {
        next();
        return;
    }
}