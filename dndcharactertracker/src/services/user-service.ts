import { User } from "../models/User";
import { getUserById, saveOneUser, updateUser } from "../daos/SQL/user-dao";
import { bucketBaseUrl } from "../daos/Cloud-Storage";
import { saveProfilePicture } from "../daos/Cloud-Storage/user-images";
import { expressEventEmitter, customExpressEvents } from "../event-listeners";




export async function getUserByIDService(id:number):Promise<User>{
    return await getUserById(id)
}

export async function saveOneUserService(newUser:User):Promise<User>{
    try{
        let base64Image = newUser.image
        let [dataType, imageBase64Data] = base64Image.split(';base64;')
        let contentType = dataType.split('/').pop()

        if (newUser.image){
            newUser.image = `${bucketBaseUrl}/users/${newUser.username}/profile.${contentType}`
        }

        let savedUser = await saveOneUser(newUser)

        await saveProfilePicture(contentType, imageBase64Data, `users/${newUser.username}/profile.${contentType}`)
        
        expressEventEmitter.emit(customExpressEvents.NEW_USER, newUser)
        return savedUser
    }catch(e){
        console.log(e);
        throw e
    }
}

export async function updateUserService(updatedUser:User):Promise<User>{
    try{
        let base64Image = updatedUser.image
        let [dataType, imageBase64Data] = base64Image.split(';base64;')
        let contentType = dataType.split('/').pop()

        if (updatedUser.image){
            updatedUser.image = `${bucketBaseUrl}/users/${updatedUser.username}/profile.${contentType}`
        }

        let savedUser = await updateUser(updatedUser)

        await saveProfilePicture(contentType, imageBase64Data, `users/${updatedUser.username}/profile.${contentType}`)
        return savedUser
    }catch(e){
        console.log(e);
        throw e
    }
}