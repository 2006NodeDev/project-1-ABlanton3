import { dndcharactertrackerClient} from ".";
import { User } from "../../models/User";



export const dndcharactertrackerUpdateUser = async (updatedUser:User) =>{
    try{
        let response = await dndcharactertrackerClient.post('/', updatedUser)
        console.log(response);
        return response.data
    }catch(e){
        console.log(e);
        console.log('There has been an error');
    }
}