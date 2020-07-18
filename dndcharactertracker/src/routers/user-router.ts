import express, { Request, Response, NextFunction } from 'express'
import {authenticationMiddleware} from '../middleware/authentication-middleware'
import { UserUserInputError } from '../errors/UserUserInputError'
import { User } from '../models/User'
import { Role } from '../models/Role'
import { saveOneUser, getUserById, updateUser } from '../daos/SQL/user-dao'
import { authorizationMiddleware } from '../middleware/authorization-middleware'
import { InvalidCredentialsError } from '../errors/InvalidCredentialsError'


export const userRouter = express.Router()




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
            role:new Role,
        }
        try{
            let savedUser = await saveOneUser(newUser)
            res.json(savedUser)
        } catch (e){
            next (e)
        }
    }
})

userRouter.use(authenticationMiddleware)

//get user by id, admin can see all, user can see self but nobody else
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

//update user
userRouter.patch('/',authorizationMiddleware(['admin', 'user']), async (req: Request, res:Response, next:NextFunction)=>{

    let { userId,
        username,
        password,
        firstName,
        lastName,
        email,
        role,
        image } = req.body
    if(!userId) { 
        res.status(400).send('Must have a User ID and at least one other field')
    }
    else if(isNaN(+userId)) { 
        res.status(400).send('ID must be a number')
    }
    else if (req.session.user.role === "user" && req.session.user.userId !== +userId){
        next(new InvalidCredentialsError)}
    else {
        let updatedUser:User = {
            userId,
            username,
            password,
            firstName,
            lastName,
            email,
            role,
            image
        }
        updatedUser.username = username || undefined
        updatedUser.password = password || undefined
        updatedUser.firstName = firstName || undefined
        updatedUser.lastName = lastName || undefined
        updatedUser.email = email || undefined
        updatedUser.image = image || undefined
        try {
            let result = await updateUser(updatedUser)
            res.json(result)
        } catch (e) {
            next(e)
        }
    }
}) 