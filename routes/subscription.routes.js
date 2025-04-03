import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware";
import { createSubscription, getUserSubscriptions } from "../controller/subscription.controller.js";

const subRouter = Router();

subRouter.get('/', (req, res) => res.send({title: 'GET all subcriptions'}));

subRouter.get('/:id', (req, res) => res.send({title: 'GET subcription details'}));


subRouter.post('/', authorize, createSubscription);


subRouter.put('/', (req, res) => res.send({title: 'UPDATE subcription'}));


subRouter.delete('/', (req, res) => res.send({title: 'DELETE subcription'}));

// subscription for a specific users
subRouter.get('/user/:id', authorize, getUserSubscriptions);


subRouter.put('/:id/cancel', (req, res) => res.send({title: 'CANCEL subcription'}));

subRouter.get('/upcoming-renewals', (req, res) => res.send({title: 'GET upcoming subcription renewals'}));



// subRouter.get('/', (req, res) => {

// });

// subRouter.get('/', (req, res) => {

// });

// subRouter.get('/', (req, res) => {

// });

// subRouter.get('/', (req, res) => {

// });

export default subRouter;