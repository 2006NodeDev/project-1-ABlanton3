import { dndcharactertrackerClient } from ".";


export const dndcharacterUpdateWeapon = async () =>{
    try{    
    let response = await dndcharactertrackerClient.patch('/weapons')
        return response.data
    }catch(e){
        console.log(e);
        console.log('There has been an error');
    }
}