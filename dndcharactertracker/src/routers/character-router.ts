import express, { Request, Response, NextFunction } from 'express'
import { authorizationMiddleware } from '../middleware/authorization-middleware'
import { getCharacterByUser } from '../daos/character-daos'


export const characterRouter = express.Router()

//get all characters by user
characterRouter.get('/userId/:id', authorizationMiddleware(['admin', 'user']), async( req:Request, res:Response, next:NextFunction)=>{
    let { id } = req.params
    if (isNaN(+id)) {
        next(new Error('User ID must be a number'))
    } else {
        try{
            let character = await getCharacterByUser(+id)
            res.json(character)
        } catch (e){
            next (e)
        }
    }
})