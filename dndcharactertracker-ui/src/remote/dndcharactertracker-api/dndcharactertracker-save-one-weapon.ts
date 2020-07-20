import { dndcharactertrackerClient } from "."
import { Weapon } from "../../models/Weapons";




export const dndcharactertrackerSaveOneWeapon = async (newWeapon:Weapon) =>{
    try{
        let response = await dndcharactertrackerClient.post('/weapons', newWeapon)
        console.log(response);
        return response.data
    }catch(e){
        console.log(e);
        console.log('There has been an error');
    }
}