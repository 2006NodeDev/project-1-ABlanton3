import express, { Request, Response, NextFunction} from 'express'
import { sessionMiddleware } from './middleware/session-middleware'
import { loggingMiddleware } from './middleware/logging-middleware'
import { InvalidCredentialsError } from './errors/InvalidCredentialsError'
import { userRouter } from './routers/user-router'
import { getUserByUsernameAndPassword } from './daos/SQL/user-dao'
import { corsFilter } from './middleware/cors-filter'
import { characterRouter } from './routers/character-router'
import { weaponRouter } from './routers/weapons-router'
import { statsRouter } from './routers/stats-router'
import './messaging/index'
import './event-listeners/new-user'

const app = express()

app.use(express.json())

app.use(loggingMiddleware)
app.use(corsFilter)
app.use(sessionMiddleware)


app.use('/users', userRouter)
app.use('/characters', characterRouter)
app.use('/weapons', weaponRouter)
app.use('/stats', statsRouter)

app.get('/health', (req:Request,res:Response)=>{
    res.sendStatus(200)
})


//login
app.post('/login', async (req:Request, res:Response, next:NextFunction)=>{
    let username = req.body.username
    let password = req.body.password
    if(!username || !password){
        next( new InvalidCredentialsError())
    } else {
        try{
            let user = await getUserByUsernameAndPassword(username, password)
            req.session.user = user
            res.json(user)
        }catch(e){
            next(e)
        }
    }
})

app.use((err, req, res, next) =>{
    if (err.statusCode){
        res.status(err.statusCode).send(err.message)
    }else{
        console.log(err)
        res.status(500).send('Something went wrong.')
    }
})

app.listen(2020, () => {
    console.log("The server is running.");
})
