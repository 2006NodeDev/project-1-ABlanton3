import { User } from '../models/User'


export class CharacterDTO{
    character_id:number
    name:string
    class:string
    race:string
    background:string
    alignment:string
    other:string
    user:User
    user_id:number
}