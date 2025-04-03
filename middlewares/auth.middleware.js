import { JWT_SECRET } from "../config/env";
import jwt from 'jsonwebtoken';
import User from "../models/user.model";
export const authorize = async (req, res, next) => {
    let token;
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token){
          res.status(401).json({
            message: 'Unauthorized'
          });  
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = User.findById(decoded.userId);
        if(!user) res.status(401).json({
            message: 'unauthorized'
        })

        req.user = user;
        next();
    } catch(error){
        res.status(401).json({
            message: 'unauthorized',
            error: error.message
        })

    }
}