import { Character } from 'src/models/Character'


export class StatsDTO{
    stat_id:number
    character:Character
    hp:number
    ac:number
    strength:number
    dexterity:number
    constitution:number
    intelligence:number
    wisdom:number
    charisma:number
    other:string
}