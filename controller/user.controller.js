import User from "../models/user.model";

export const getUsers = async (req, res, next) =>{
    try {
        const users = User.find();

        res.status(201).json({
            success: true, 
            data: {
                users
            }
        });
    } catch(error){
        next(error);
    }
}

export const getUser = async (req, res, next) =>{
    try {
        const user = User.findById(req.params.id).select("-password"); // we are interested in everything except password

        if(!user){
            const error = new Error('user not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(201).json({
            success: true, 
            data: {
                user
            }
        });
    } catch(error){
        next(error);
    }
}