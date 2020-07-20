import express, { Request, Response, NextFunction } from 'express'
import { authenticationMiddleware } from "src/middleware/authentication-middleware";
import { getCharacterWeapons, saveOneWeapon, updateWeapon } from 'src/daos/SQL/weapon-dao';
import { authorizationMiddleware } from 'src/middleware/authorization-middleware';
import { UserUserInputError } from 'src/errors/UserUserInputError';
import { Weapon } from 'src/models/Weapon';


export const weaponRouter = express.Router()

weaponRouter.use(authenticationMiddleware)

//get character and weapons
weaponRouter.get('/characterWeaponId/:id', async( req:Request, res:Response, next:NextFunction)=>{
    let { id } = req.params
    if (isNaN(+id)) {
        next(new Error('Character ID must be a number'))
    } else {
        try{
            let weapon = await getCharacterWeapons(+id)
            res.json(weapon)
        } catch (e){
            next (e)
        }
    }
})

// add weapon, need authorization but I need to figure out how I'm going to do that because I don't call for user ID
weaponRouter.post('/', async (req: Request, res: Response, next:NextFunction)=>{
    let {type, name, attackBonus, damageDice, damageType, properties, other, character } = req.body
    if (!type || !name || !attackBonus || !damageDice || !damageType || !properties || !other || !character){
        next(new UserUserInputError)
    } else {
        let newWeapon: Weapon ={
            weaponId: 0,
            type,
            name,
            attackBonus,
            damageDice,
            damageType,
            properties,
            other,
            character //I don't love this, too easy for people to add their weapons to other characters
            
        }
        try{
            let savedWeapon = await saveOneWeapon(newWeapon)
            res.json(savedWeapon)
        } catch (e){
            next (e)
        }
    }
})

//update weapon, need authorization but I need to figure out how I'm going to do that because I don't call for user ID .patch
weaponRouter.patch('/',authorizationMiddleware(['admin', 'user']), async (req: Request, res:Response, next:NextFunction)=>{

    let { weaponId,
        type,
        name,
        attackBonus,
        damageDice,
        damageType,
        properties,
        other,
        character } = req.body
    if(!weaponId) { 
        res.status(400).send('Must have a Weapon ID and at least one other field')
    }
    else if(isNaN(+weaponId)) { 
        res.status(400).send('ID must be a number')
    }
    /*else if (req.session.user.role === "user" && req.session.user.userId !== +user){
        next(new InvalidCredentialsError)}*/
    else {
        let updatedWeapon:Weapon = {
            weaponId,
            type,
            name,
            attackBonus,
            damageDice,
            damageType,
            properties,
            other,
            character
        }
        updatedWeapon.type = type || undefined
        updatedWeapon.name = name || undefined
        updatedWeapon.attackBonus = attackBonus || undefined
        updatedWeapon.damageDice = damageDice || undefined
        updatedWeapon.damageType = damageType || undefined
        updatedWeapon.properties = properties || undefined
        updatedWeapon.other = other || undefined
        try {
            let result = await updateWeapon(updatedWeapon)
            res.json(result)
        } catch (e) {
            next(e)
        }
    }
}) 
