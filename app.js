// import express js
import express from 'express';
import {PORT} from './config/env.js';
import cookieParser from 'cookie-parser';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subRouter from './routes/subscription.routes.js';

import connectToDatabase from './Database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import workflowRouter from './routes/workflow.routes.js';

// creating an object of express
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subRouter);
app.use('/api/v1/workflows', workflowRouter);
app.use(errorMiddleware);



// call this app instance and you can create diff requests
// here is syntax , first -> route , second -> a callback function

app.get('/', (req, res) => {
    res.send("Welcome to the subcription tracker api");
});


// creating a req is not enough, we have to make out server listen for requests trying to access specific routes
app.listen(PORT, async() => {
    // this will expose your full URL where you can access all your routes
    console.log(`Subscription tracker API is running on: http://localhost:${PORT}`);

    await connectToDatabase();
});

export default app;