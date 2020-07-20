import express, { Request, Response, NextFunction } from 'express'
import { authenticationMiddleware } from "src/middleware/authentication-middleware";

export const statsRouter = express.Router()

statsRouter.use(authenticationMiddleware)

//get character + stats .get
//update stats needs authorization but I need to figure out how I'm going to do that because I don't call for user ID .patch