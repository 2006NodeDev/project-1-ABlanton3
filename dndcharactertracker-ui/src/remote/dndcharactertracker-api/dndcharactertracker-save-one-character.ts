import { dndcharactertrackerClient } from "."
import { Character } from "../../models/Characters";



export const dndcharactertrackerSaveOneCharacter = async (newCharacter:Character) =>{
    try{
        let response = await dndcharactertrackerClient.post('/characters', newCharacter)
        console.log(response);
        return response.data
    }catch(e){
        console.log(e);
        console.log('There has been an error');
    }
}