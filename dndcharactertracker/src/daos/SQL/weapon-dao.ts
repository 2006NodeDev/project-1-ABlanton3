import { Weapon } from "src/models/Weapon"
import { connectionPool } from "."
import { PoolClient } from "pg";
import { WeaponsDTOtoWeaponsConvertor } from "src/utils/WeaponsDTO-to-Weapons-Convertor";
import { CharacterNotFoundError } from "src/errors/CharacterNotFoundError";
import { UserUserInputError } from "src/errors/UserUserInputError";


//get character + weapons
export async function getCharacterWeapons(id:number):Promise<Weapon>{
    let client: PoolClient
    try{
        client = await connectionPool.connect()
        let results = await client.query(`select * from dndcharacter."characters" c, dndcharacter.weapons w 
                                        where c."character_id" = w."character" and c."character_id" = $1;`,
                                        [id])
        if(results.rowCount === 0){
            throw new Error('Character Not Found')
        }
        return WeaponsDTOtoWeaponsConvertor(results.rows[0])
    } catch(e){
        if(e.message === 'Character Not Found'){
            throw new CharacterNotFoundError()
        }
        console.log(e)
        throw new Error('Unhandled Error Occurred')
    } finally {
        client && client.release()
    }
}
//add weapon
export async function saveOneWeapon(newWeapon:Weapon):Promise<Weapon>{ 
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        await client.query('BEGIN;')
        let userId = await client.query(`select c."character_id" from dndcharactertracker.characters c where c."character" = $1`, [newWeapon.character])
        if(userId.rowCount === 0){
            throw new Error('Character Not Found')
        }
        let results = await client.query(`insert into dndcharacter.weapons ("type", "name", "attack_bonus", "damage_dice", "properties", "other", "character")
                                            values($1,$2,$3,$4,$5,$6,$7,$8) returning "character_id" `,
                                            [newWeapon.type, newWeapon.name, newWeapon.attackBonus, newWeapon.damageDice, newWeapon.properties, newWeapon.other, newWeapon.character])
        newWeapon.character = results.rows[0].character_id
        await client.query('COMMIT;')
        return newWeapon
    }catch(e){
        client && client.query('ROLLBACK;')
        if(e.message === 'Character Not Found'){
            throw new UserUserInputError()
        }
        console.log(e)
        throw new Error('Unhandled Error Occured')
    }finally{
        client && client.release();
    }
}

//update weapon
export async function updateWeapon(updatedWeapon:Weapon){
    let client: PoolClient;
    try{
        client = await connectionPool.connect();
        client.query('begin');

        if(updatedWeapon.type){
            await client.query(`update dndcharacter.weapons set "type" = $1
                                    where weapon_id = $2;`,
                                    [updatedWeapon.type, updatedWeapon.weaponId])
        }
        if(updatedWeapon.name){
            await client.query(`update dndcharacter.weapons set "name" = $1
                                where weapon_id = $2;`,
                                [updatedWeapon.name, updatedWeapon.weaponId])
        }
        if(updatedWeapon.attackBonus){
            await client.query(`update dndcharacter.weapons set "attack_bonus" = $1
                                where weapon_id = $2;`,
                                [updatedWeapon.attackBonus, updatedWeapon.weaponId])
        }
        if(updatedWeapon.damageDice){
            await client.query(`update dndcharacter.weapons set "damage_dice" = $1
                                where weapon_id = $2;`,
                                [updatedWeapon.damageDice, updatedWeapon.weaponId])
        }
        if(updatedWeapon.damageType){
            await client.query(`update dndcharacter.weapons set "damage_type" = $1
                                where weapon_id = $2;`,
                                [updatedWeapon.damageType, updatedWeapon.weaponId])
        }
        if(updatedWeapon.properties){
            await client.query(`update dndcharacter.weapons set "properties" = $1
                                where weapon_id = $2;`,
                                [updatedWeapon.properties, updatedWeapon.weaponId])

        }
        if(updatedWeapon.other){
            await client.query(`update dndcharacter.weapons set "other" = $1
                                where weapon_id = $2;`,
                                [updatedWeapon.other, updatedWeapon.weaponId])

        }
        await client.query('COMMIT;')
        return updatedWeapon
    }catch (e) {
        console.log(e);
        throw new Error ('Unhandled Error')
        
    } finally{
        client && client.release()
    }
}