import { Router } from "express";
import { getUser, getUsers } from "../controller/user.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";
import errorMiddleware from "../middlewares/error.middleware.js";
const userRouter = Router();


// details of all users
userRouter.get('/', getUsers);

// details of a single user -> get user by id
userRouter.get('/:id', authorize, errorMiddleware, getUser);  // :id -> dynamic parameter

// create a new user
userRouter.post('/', (req, res) => res.send({title: "CREATE new user"}));
 
userRouter.put('/:id', (req, res) => res.send({title: "UPDATE a user"}));     // updates

// delete a user
userRouter.delete('/', (req, res) => res.send({title: "delete a user"}));


export default userRouter;