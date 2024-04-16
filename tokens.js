import jwt from 'jsonwebtoken';
//import cookieParser from 'cookie-parser';


const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;
    if(!token) {
        return res.sendStatus(401).send('Unauthorized');
    }

    try{
        const decoded = jwt.verify(token, 'secret-key');
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        res.sendStatus(403).send('Invalid Token');
    }
};

export default verifyToken;