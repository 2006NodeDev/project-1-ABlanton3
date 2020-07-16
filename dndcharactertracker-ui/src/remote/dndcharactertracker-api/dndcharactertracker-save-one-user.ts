import { dndcharactertrackerClient } from "."
import { User } from "../../models/User";


export const dndcharactertrackerSaveOneUser = async (newUser:User) =>{
    try{
        let response = await dndcharactertrackerClient.post('/users')
        return response.data
    }catch(e){
        console.log(e);
        console.log('There has been an error');
    }
}