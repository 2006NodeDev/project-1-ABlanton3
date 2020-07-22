import { User } from "../../models/User";
import { PoolClient } from "pg";
import { connectionPool } from ".";
import { InvalidCredentialsError } from "../../errors/InvalidCredentialsError";
import { UserDTOtoUserConvertor } from "../../utils/UserDTO-to-User-convertor";
import { UserUserInputError } from "../../errors/UserUserInputError";
import { UserNotFoundError } from "../../errors/UserNotFoundError";



//add new user
export async function saveOneUser(newUser:User):Promise<User>{ 
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        await client.query('BEGIN;')
        let results = await client.query(`insert into dndcharacter.users ("username", "password", "first_name", "last_name", "email", "image")
                                            values($1,$2,$3,$4,$5,$6) returning "user_id" `,
                                            [newUser.username, newUser.password, newUser.firstName, newUser.lastName, newUser.email, newUser.image])
        newUser.userId = results.rows[0].user_id
        await client.query('COMMIT;')
        return newUser

    }catch(e){
        client && client.query('ROLLBACK;')
        if(e.message === 'Role Not Found'){
            throw new UserUserInputError()
        }
        console.log(e)
        throw new Error('Unhandled Error Occured')
    }finally{
        client && client.release();
    }
}

//update user
export async function updateUser(updatedUser:User){
    let client: PoolClient;
    try{
        client = await connectionPool.connect();
        client.query('begin');

        if(updatedUser.username){
            await client.query(`update dndcharacter.users set "username" = $1
                                    where user_id = $2;`,
                                    [updatedUser.username, updatedUser.userId])
        }
        if(updatedUser.password){
            await client.query(`update dndcharacter.users set "password" = $1
                                where user_id = $2;`,
                                [updatedUser.password, updatedUser.userId])
        }
        if(updatedUser.firstName){
            await client.query(`update dndcharacter.users set "first_name" = $1
                                where user_id = $2;`,
                                [updatedUser.firstName, updatedUser.userId])
        }
        if(updatedUser.lastName){
            await client.query(`update dndcharacter.users set "last_name" = $1
                                where user_id = $2;`,
                                [updatedUser.lastName, updatedUser.userId])
        }
        if(updatedUser.email){
            await client.query(`update dndcharacter.users set "email" = $1
                                where user_id = $2;`,
                                [updatedUser.email, updatedUser.userId])
        }
        if(updatedUser.image){
            await client.query(`update dndcharacter.users set "image" = $1
                                where user_id = $2;`,
                                [updatedUser.image, updatedUser.userId])

        }
        await client.query('COMMIT;')
        return getUserById(updatedUser.userId)
    }catch (e) {
        console.log(e);
        throw new Error ('Unhandled Error')
        
    } finally{
        client && client.release()
    }
}

//get user by ID
export async function getUserById(id:number):Promise<User>{
    let client: PoolClient
    try{
        client = await connectionPool.connect()
        let results = await client.query(`select u."user_id",
                                        u."username",
                                        u."first_name",
                                        u."last_name",
                                        u."email",
                                        r."role_id",
                                        r."role",
                                        u."image"
                                        from dndcharacter.users u left join dndcharacter.roles r on u."role" = r."role_id"
                                        where u."user_id" = $1;`,
                                        [id])
        if(results.rowCount === 0){
            throw new Error('User Not Found')
        }
        return UserDTOtoUserConvertor(results.rows[0])
    } catch(e){
        if(e.message === 'User Not Found'){
            throw new UserNotFoundError()
        }
        console.log(e)
        throw new Error('Unhandled Error Occurred')
    } finally {
        client && client.release()
    }
}

//login
export async function getUserByUsernameAndPassword(username:string, password:string):Promise<User>{
    let client: PoolClient
    try{
        client = await connectionPool.connect()
        let results = await client.query(`select u."user_id",
            u."username",
            u."password",
            u."first_name",
            u."last_name",
            u."email",
            r."role_id",
            r."role",
            u."image"
            from dndcharacter.users u left join dndcharacter.roles r on u."role" = r."role_id"
            where u."username" = $1 and u."password" = $2;`,
            [username, password])
        if(results.rowCount === 0){
            throw new Error ('User Not Found')
        }
        return UserDTOtoUserConvertor(results.rows[0])
    } catch (e) {
        if (e.message === 'User Not Found'){
            throw new InvalidCredentialsError()
        }
        console.log(e)
        throw new Error('Unhandled Error Occurred')
    } finally {
        client && client.release()
    }
}