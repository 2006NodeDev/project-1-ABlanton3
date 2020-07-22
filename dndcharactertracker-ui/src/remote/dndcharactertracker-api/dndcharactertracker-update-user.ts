import { dndcharactertrackerClient} from ".";
import { User } from "../../models/User";



export const dndcharactertrackerUpdateUser = async (updatedUser:User) =>{
    try{
        console.log(updatedUser);
        let response = await dndcharactertrackerClient.patch('/users', updatedUser)
        console.log(response);
        return response.data
    }catch(e){
        console.log(e);
        console.log('There has been an error');
    }
}