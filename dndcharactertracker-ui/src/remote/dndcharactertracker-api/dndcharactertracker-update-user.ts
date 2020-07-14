import { dndcharactertrackerClient } from ".";


export const dndcharacterUpdateUser = async () =>{
    try{    
    let response = await dndcharactertrackerClient.patch('/users')
        return response.data
    }catch(e){
        console.log(e);
        console.log('There has been an error');
    }
}
