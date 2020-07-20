import { dndcharactertrackerClient } from ".";

export const dndcharactertrackerGetCharacterStats = async (characterId:number) =>{

    try{
        let response = await dndcharactertrackerClient.get(`stats/${characterId}`)
        return response.data
    } catch(e){
        console.log(e);
        console.log(`There has been an error`);
    }
}