import { dndcharactertrackerClient } from ".";

export const dndcharactertrackerGetCharacterWeapon = async (characterId:number) =>{

    try{
        let response = await dndcharactertrackerClient.get(`weapons/characterId/${characterId}`)
        return response.data
    } catch(e){
        console.log(e);
        console.log(`There has been an error`);
    }
}