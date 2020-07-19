import { User } from '../models/User'


export class CharacterDTO{
    character_id:number
    name:string
    gender:string
    class:string
    race:string
    background:string
    alignment:string
    other:string
    level:number
    user:User
    user_id:number
}