import express, { Request, Response, NextFunction } from 'express'
import {authenticationMiddleware} from '../middleware/authentication-middleware'
import { UserUserInputError } from '../errors/UserUserInputError'
import { User } from '../models/User'
import { Role } from '../models/Role'
import { saveOneUser, getUserById } from '../daos/user-dao'
import { authorizationMiddleware } from '../middleware/authorization-middleware'
import { InvalidCredentialsError } from '../errors/InvalidCredentialsError'

export const userRouter = express.Router()

userRouter.use(authenticationMiddleware)


//create new users, auto sets role to user
userRouter.post('/', async (req: Request, res: Response, next:NextFunction)=>{
    let {username, password, firstName, lastName, email} = req.body
    if (!username || !password || !firstName || !lastName || !email){
        next(new UserUserInputError)
    } else {
        let newUser: User ={
            userId: 0,
            username,
            password,
            firstName,
            lastName,
            email,
            role:new Role
        }
        try{
            let savedUser = await saveOneUser(newUser)
            res.json(savedUser)
        } catch (e){
            next (e)
        }
    }
})

//get user by id, admin can see all, user can see self *hopefully*
userRouter.get('/:id', authorizationMiddleware(['admin', 'user']), async (req: Request, res: Response, next: NextFunction) => {
    let { id } = req.params
    if (isNaN(+id)) {
        res.status(400).send('ID needs to be a number')
    } else if (req.session.user.role === "user" && req.session.user.userId !== +id){
        next(new InvalidCredentialsError)
    } else{
        try {
            let user = await getUserById(+id)
            res.json(user)
        } catch (e) {
            next(e)
        }
    }
    
})