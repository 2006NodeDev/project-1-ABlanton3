import { dndcharactertrackerClient } from ".";
import { Character } from "../../models/Characters";


export const dndcharactertrackerUpdateCharacter = async (updatedCharacter:Character) =>{
    try{    
    let response = await dndcharactertrackerClient.patch('/characters')
        return response.data
    }catch(e){
        console.log(e);
        console.log('There has been an error');
    }
}
