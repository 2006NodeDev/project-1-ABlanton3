import express, { Request, Response, NextFunction } from 'express'
import { authenticationMiddleware } from "src/middleware/authentication-middleware";
import { getCharacterStats, updateStats, saveNewStats } from 'src/daos/SQL/stats-dao';
import { authorizationMiddleware } from 'src/middleware/authorization-middleware';
import { Statistics } from 'src/models/Statistics';
import { UserUserInputError } from 'src/errors/UserUserInputError';

export const statsRouter = express.Router()

statsRouter.use(authenticationMiddleware)

//get character + stats .get
statsRouter.get('/:id', async( req:Request, res:Response, next:NextFunction)=>{
    let { id } = req.params
    if (isNaN(+id)) {
        next(new Error('Character ID must be a number'))
    } else {
        try{
            let stats = await getCharacterStats(+id)
            res.json(stats)
        } catch (e){
            next (e)
        }
    }
})
//new stats for new character .post
statsRouter.post('/', async (req: Request, res: Response, next:NextFunction)=>{
    let {character, healthPoints, armorClass, strength, dexterity, constitution, intelligence, wisdom, charisma} = req.body
    if (!character || !healthPoints || !armorClass || !strength || !dexterity || !constitution || !intelligence || !wisdom || !charisma){
        next(new UserUserInputError)
    } else {
        let newStats: Statistics ={
            statId: 0,
            character, //gotta figure out a better way so people can't add stats to random characters
            healthPoints,
            armorClass,
            strength,
            dexterity,
            constitution,
            intelligence,
            wisdom,
            charisma,
            other:''  
        }
        try{
            let savedWeapon = await saveNewStats(newStats)
            res.json(savedWeapon)
        } catch (e){
            next (e)
        }
    }
})

//update stats needs authorization but I need to figure out how I'm going to do that because I don't call for user ID .patch
statsRouter.patch('/',authorizationMiddleware(['admin', 'user']), async (req: Request, res:Response, next:NextFunction)=>{

    let { statId,
        character,
        healthPoints,
        armorClass,
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
        other} = req.body
    if(!statId) { 
        res.status(400).send('Must have a Stat ID and at least one other field')
    }
    else if(isNaN(+statId)) { 
        res.status(400).send('ID must be a number')
    }
    /*else if (req.session.user.role === "user" && req.session.user.userId !== +user){
        next(new InvalidCredentialsError)}*/
    else {
        let updatedStats:Statistics = {
            statId,
            character,
            healthPoints,
            armorClass,
            strength,
            dexterity,
            constitution,
            intelligence,
            wisdom,
            charisma,
            other
        }
        updatedStats.healthPoints = healthPoints || undefined
        updatedStats.armorClass = armorClass || undefined
        updatedStats.strength = strength || undefined
        updatedStats.dexterity = dexterity || undefined
        updatedStats.constitution = constitution || undefined
        updatedStats.intelligence = intelligence || undefined
        updatedStats.wisdom = wisdom || undefined
        updatedStats.charisma = charisma || undefined
        updatedStats.other = other || undefined
        try {
            let result = await updateStats(updatedStats)
            res.json(result)
        } catch (e) {
            next(e)
        }
    }
}) 