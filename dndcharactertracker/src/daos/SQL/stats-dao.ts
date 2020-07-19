import { PoolClient } from "pg";
import { connectionPool } from ".";
import { CharacterNotFoundError } from "src/errors/CharacterNotFoundError";
import { Statistics } from "src/models/Statistics";
import { StatsDTOtoStatisticsConvertor } from "src/utils/StatsDTO-to-Statistics-Convertor";


//get character + stats

export async function getCharacterStats(id:number):Promise<Statistics>{
    let client: PoolClient
    try{
        client = await connectionPool.connect()
        let results = await client.query(`select * from dndcharacter."characters" c, dndcharacter.stats s 
                                        where c."character_id" = s."character" and c."character_id" = $1;`,
                                        [id])
        if(results.rowCount === 0){
            throw new Error('Character Not Found')
        }
        return StatsDTOtoStatisticsConvertor(results.rows[0])
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

//update stats
export async function updateStats(updatedStats:Statistics){
    let client: PoolClient;
    try{
        client = await connectionPool.connect();
        client.query('begin');

        if(updatedStats.healthPoints){
            await client.query(`update dndcharacter.stats set "hp" = $1
                                    where stat_id = $2;`,
                                    [updatedStats.healthPoints, updatedStats.statId])
        }
        if(updatedStats.armorClass){
            await client.query(`update dndcharacter.stats set "ac" = $1
                                where stat_id = $2;`,
                                [updatedStats.armorClass, updatedStats.statId])
        }
        if(updatedStats.strength){
            await client.query(`update dndcharacter.stats set "strength" = $1
                                where stat_id = $2;`,
                                [updatedStats.strength, updatedStats.statId])
        }
        if(updatedStats.dexterity){
            await client.query(`update dndcharacter.stats set "dexterity" = $1
                                where stat_id = $2;`,
                                [updatedStats.dexterity, updatedStats.statId])
        }
        if(updatedStats.constitution){
            await client.query(`update dndcharacter.stats set "constitution" = $1
                                where stat_id = $2;`,
                                [updatedStats.constitution, updatedStats.statId])
        }
        if(updatedStats.intelligence){
            await client.query(`update dndcharacter.stats set "intelligence" = $1
                                where stat_id = $2;`,
                                [updatedStats.intelligence, updatedStats.statId])

        }
        if(updatedStats.wisdom){
            await client.query(`update dndcharacter.stats set "wisdom" = $1
                                where stat_id = $2;`,
                                [updatedStats.wisdom, updatedStats.statId])

        }
        if(updatedStats.charisma){
            await client.query(`update dndcharacter.stats set "charisma" = $1
                                where stat_id = $2;`,
                                [updatedStats.charisma, updatedStats.statId])

        }
        if(updatedStats.other){
            await client.query(`update dndcharacter.stats set "other" = $1
                                where stat_id = $2;`,
                                [updatedStats.other, updatedStats.statId])

        }
        await client.query('COMMIT;')
        return updatedStats
    }catch (e) {
        console.log(e);
        throw new Error ('Unhandled Error')
        
    } finally{
        client && client.release()
    }
}