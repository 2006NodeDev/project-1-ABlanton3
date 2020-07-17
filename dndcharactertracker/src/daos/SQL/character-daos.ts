import { Character } from "../../models/Character";
import { PoolClient } from "pg";
import { connectionPool } from ".";
import { CharacterDTOtoCharacterConvertor } from "../../utils/CharacterDTO-to-Character-Convertor";
import { UserNotFoundError } from "../../errors/UserNotFoundError";

//all charas by user
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

//add character

//get full character info
//maybe get all characters all info?

//edit character