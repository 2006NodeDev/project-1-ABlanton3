import { dndcharactertrackerClient } from "."



export const dndcharactertrackerGetUserById = async (userId:number) =>{

    try{
        let response = await dndcharactertrackerClient.get(`users/${userId}`)
        return response.data
    } catch(e){
        console.log(e);
        console.log(`There has been an error`);
    }
}