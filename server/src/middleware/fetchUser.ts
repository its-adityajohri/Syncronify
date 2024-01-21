import { Request, Response, NextFunction } from 'express';
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'complexrandomstringsecret';

const fetchuser = (req: any, res: Response, next: NextFunction) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}


export default fetchuser;