import { dndcharactertrackerClient } from ".";

export const dndcharactertrackerGetFullCharacterInfo = async (characterId:number) =>{

    try{
        let response = await dndcharactertrackerClient.get(`characters/characterId/${characterId}`)
        return response.data
    } catch(e){
        console.log(e);
        console.log(`There has been an error`);
    }
}