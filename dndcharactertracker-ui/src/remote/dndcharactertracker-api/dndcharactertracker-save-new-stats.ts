import { dndcharactertrackerClient } from "."
import { Statistics } from "../../models/Statistics";




export const dndcharactertrackerSaveOneStats = async (newStats:Statistics) =>{
    try{
        let response = await dndcharactertrackerClient.post('/stats', newStats)
        console.log(response);
        return response.data
    }catch(e){
        console.log(e);
        console.log('There has been an error');
    }
}