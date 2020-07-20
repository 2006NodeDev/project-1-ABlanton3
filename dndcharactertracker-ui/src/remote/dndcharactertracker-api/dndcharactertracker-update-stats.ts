import { dndcharactertrackerClient } from ".";


export const dndcharacterUpdateStats = async () =>{
    try{    
    let response = await dndcharactertrackerClient.patch('/stats')
        return response.data
    }catch(e){
        console.log(e);
        console.log('There has been an error');
    }
}