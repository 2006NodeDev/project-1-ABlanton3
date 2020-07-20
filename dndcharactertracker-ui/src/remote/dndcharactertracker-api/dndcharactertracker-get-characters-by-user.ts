import { dndcharactertrackerClient } from ".";

export const dndcharactertrackerGetCharacterByUser = async (userId:number) =>{

    try{
        let response = await dndcharactertrackerClient.get(`characters/userId/${userId}`)
        return response.data
    } catch(e){
        console.log(e);
        console.log(`There has been an error`);
    }
}