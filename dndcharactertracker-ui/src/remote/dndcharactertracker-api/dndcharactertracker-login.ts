import { dndcharactertrackerClient } from "."



export const dndcharactertrackerLogin = async (username:string, password:string) =>{
    let credentials ={
        username,
        password
    }
    try{
        let response = await dndcharactertrackerClient.post('/login', credentials)
        console.log(response);
        return response.data 
    } catch (e){
       console.log(e);
    }
}