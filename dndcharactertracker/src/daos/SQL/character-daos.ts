import { Character } from "../../models/Character";
import { PoolClient } from "pg";
import { connectionPool } from ".";
import { CharacterDTOtoCharacterConvertor } from "../../utils/CharacterDTO-to-Character-Convertor";
import { UserNotFoundError } from "../../errors/UserNotFoundError";
import {UserUserInputError} from "../../errors/UserUserInputError";
import { CharacterNotFoundError } from "src/errors/CharacterNotFoundError";


//all characters by user
export async function getCharacterByUser(id:number):Promise<Character[]> {
    let client: PoolClient
    try {
        client = await connectionPool.connect()
        let results = await client.query(`select * from dndcharacter.characters c
                                        left join dndcharacter.users u on c.user = u.user_id
                                        where c.user = ${id}
                                        order by character_id;`)
        if(results.rowCount === 0){
            throw new Error('User Not Found')
        }
        return results.rows.map(CharacterDTOtoCharacterConvertor)
    } catch (e){
        if(e.message === 'User Not Found'){
            throw new UserNotFoundError()
        }
        console.log(e);
        throw new Error('Unhandled Error Occured')
    } finally {
        client && client.release()
    }
}

//get character by character id
export async function getCharacterById(id:number):Promise<Character>{
    let client: PoolClient
    try{
        client = await connectionPool.connect()
        let results = await client.query(`select "character_id",
                                        "name",
                                        "gender",
                                        "class",
                                        "race",
                                        "background",
                                        "alignment",
                                        "level",
                                        "other",
                                        "user",
                                        from dndcharacter.characters
                                        where "character_id" = $1;`,
                                        [id])
        if(results.rowCount === 0){
            throw new Error('Character Not Found')
        }
        return CharacterDTOtoCharacterConvertor(results.rows[0])
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

//add character
export async function saveOneCharacter(newCharacter:Character):Promise<Character>{ 
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        await client.query('BEGIN;')
        let userId = await client.query(`select u."user_id" from dndcharactertracker.users u where u."user" = $1`, [newCharacter.user])
        if(userId.rowCount === 0){
            throw new Error('User Not Found')
        }
        let results = await client.query(`insert into dndcharacter.characters ("name", "gender", "class", "race", "background", "alignment", "level", "other", "user")
                                            values($1,$2,$3,$4,$5,$6,$7,$8) returning "character_id" `,
                                            [newCharacter.name, newCharacter.gender, newCharacter.dndClass, newCharacter.race, newCharacter.background, newCharacter.alignment, newCharacter.level, newCharacter.other, userId])
        newCharacter.characterId = results.rows[0].character_id
        await client.query('COMMIT;')
        return newCharacter
    }catch(e){
        client && client.query('ROLLBACK;')
        if(e.message === 'User Not Found'){
            throw new UserUserInputError()
        }
        console.log(e)
        throw new Error('Unhandled Error Occured')
    }finally{
        client && client.release();
    }
}

//edit character
export async function updateCharacter(updatedCharacter:Character){
    let client: PoolClient;
    try{
        client = await connectionPool.connect();
        client.query('begin');

        if(updatedCharacter.name){
            await client.query(`update dndcharacter.characters set "name" = $1
                                    where character_id = $2;`,
                                    [updatedCharacter.name, updatedCharacter.characterId])
        }
        if(updatedCharacter.gender){
            await client.query(`update dndcharacter.characters set "gender" = $1
                                where character_id = $2;`,
                                [updatedCharacter.gender, updatedCharacter.characterId])
        }
        if(updatedCharacter.dndClass){
            await client.query(`update dndcharacter.characters set "class" = $1
                                where character_id = $2;`,
                                [updatedCharacter.dndClass, updatedCharacter.characterId])
        }
        if(updatedCharacter.race){
            await client.query(`update dndcharacter.characters set "race" = $1
                                where character_id = $2;`,
                                [updatedCharacter.race, updatedCharacter.characterId])
        }
        if(updatedCharacter.background){
            await client.query(`update dndcharacter.characters set "background" = $1
                                where character_id = $2;`,
                                [updatedCharacter.background, updatedCharacter.characterId])
        }
        if(updatedCharacter.alignment){
            await client.query(`update dndcharacter.characters set "alignment" = $1
                                where character_id = $2;`,
                                [updatedCharacter.alignment, updatedCharacter.characterId])

        }
        if(updatedCharacter.level){
            await client.query(`update dndcharacter.characters set "level" = $1
                                where character_id = $2;`,
                                [updatedCharacter.level, updatedCharacter.characterId])

        }
        if(updatedCharacter.other){
            await client.query(`update dndcharacter.characters set "other" = $1
                                where character_id = $2;`,
                                [updatedCharacter.other, updatedCharacter.characterId])

        }
        await client.query('COMMIT;')
        return updatedCharacter
    }catch (e) {
        console.log(e);
        throw new Error ('Unhandled Error')
        
    } finally{
        client && client.release()
    }
}


//get full character info
export async function getFullCharacterInfo(id:number):Promise<Character[]> {
    let client: PoolClient
    try {
        client = await connectionPool.connect()
        let results = await client.query(`select *  from dndcharacter."characters c,
                                        dndcharacter.stats s, dndcharacter.weapons w
                                        where c."character_id" = s."character" and c."character_id" = w."character"
                                        and c."character_id" = ${id}`)
        if(results.rowCount === 0){
            throw new Error('Character Not Found')
        }
        return results.rows.map(CharacterDTOtoCharacterConvertor)
    } catch (e){
        if(e.message === 'Character Not Found'){
            throw new CharacterNotFoundError()
        }
        console.log(e);
        throw new Error('Unhandled Error Occured')
    } finally {
        client && client.release()
    }
}
