import { dndcharactertrackerClient } from "."


export const dndcharactertrackerSaveOneUser = async (username:string, password:string, firstName:string, lastName:string, email:string) =>{
    try{
        let response = await dndcharactertrackerClient.post('/users')
        return response.data
    }catch(e){
        console.log(e);
        console.log('There has been an error');
    }
}