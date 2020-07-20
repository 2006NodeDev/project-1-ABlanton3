import express, { Request, Response, NextFunction } from 'express'
import { getCharacterByUser, getCharacterById, getFullCharacterInfo, updateCharacter } from '../daos/SQL/character-daos'
import { authenticationMiddleware } from 'src/middleware/authentication-middleware'
import { authorizationMiddleware } from 'src/middleware/authorization-middleware'
import { Character } from 'src/models/Character'
import { InvalidCredentialsError } from 'src/errors/InvalidCredentialsError'
import { UserUserInputError } from 'src/errors/UserUserInputError'
import {saveOneCharacter} from 'src/daos/SQL/character-daos'
import { User } from 'src/models/User'


export const characterRouter = express.Router()

characterRouter.use(authenticationMiddleware)

//get all characters by user, anyone who is logged in can view (useful for DMs and other players in the campaign)
characterRouter.get('/userId/:id', async( req:Request, res:Response, next:NextFunction)=>{
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

//get full character info (weapons + stats), anyone who is logged in can view (useful for DMs and other players in the campaign) .get('/characterID/:id)
characterRouter.get('/characterID/:id', async (req: Request, res: Response, next: NextFunction) => {
    let { id } = req.params
    if (isNaN(+id)) {
        res.status(400).send('ID needs to be a number')
    } else{
        try {
            let user = await getFullCharacterInfo(+id)
            res.json(user)
        } catch (e) {
            next(e)
        }
    }
    
})

//get character by id, anyone who is logged in can view (useful for DMs and other players in the campaign)
characterRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    let { id } = req.params
    if (isNaN(+id)) {
        res.status(400).send('ID needs to be a number')
    } else{
        try {
            let user = await getCharacterById(+id)
            res.json(user)
        } catch (e) {
            next(e)
        }
    }
    
})

//add character, authorization required
characterRouter.post('/', async (req: Request, res: Response, next:NextFunction)=>{
    let {name, gender, dndClass, race, background, alignment, level, other } = req.body
    if (!name || !gender || !dndClass || !race || !background || !alignment || !level || !other){
        next(new UserUserInputError)
    } else {
        let newCharacter: Character ={
            characterId: 0,
            name,
            gender,
            dndClass,
            race,
            background,
            alignment,
            level,
            other,
            user: new User //I don't think this is right
            
        }
        try{
            let savedCharacter = await saveOneCharacter(newCharacter)
            res.json(savedCharacter)
        } catch (e){
            next (e)
        }
    }
})

//edit character, authorization required .patch
characterRouter.patch('/',authorizationMiddleware(['admin', 'user']), async (req: Request, res:Response, next:NextFunction)=>{

    let { characterId,
        name,
        gender,
        dndClass,
        race,
        background,
        alignment,
        level,
        other,
        user } = req.body
    if(!characterId) { 
        res.status(400).send('Must have a Character ID and at least one other field')
    }
    else if(isNaN(+characterId)) { 
        res.status(400).send('ID must be a number')
    }
    else if (req.session.user.role === "user" && req.session.user.userId !== +user){
        next(new InvalidCredentialsError)}
    else {
        let updatedCharacter:Character = {
            characterId,
            name,
            gender,
            dndClass,
            race,
            background,
            alignment,
            level,
            other,
            user
        }
        updatedCharacter.name = name || undefined
        updatedCharacter.gender = gender || undefined
        updatedCharacter.dndClass = dndClass || undefined
        updatedCharacter.race = race || undefined
        updatedCharacter.background = background || undefined
        updatedCharacter.alignment = alignment || undefined
        updatedCharacter.level = level || undefined
        updatedCharacter.other = other || undefined
        try {
            let result = await updateCharacter(updatedCharacter)
            res.json(result)
        } catch (e) {
            next(e)
        }
    }
}) 
