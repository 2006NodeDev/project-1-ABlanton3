import { dndcharactertrackerClient } from "."



export const dndcharactertrackerGetCharacterById = async (characterId:number) =>{

    try{
        let response = await dndcharactertrackerClient.get(`characters/${characterId}`)
        return response.data
    } catch(e){
        console.log(e);
        console.log(`There has been an error`);
    }
}