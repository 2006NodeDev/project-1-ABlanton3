import { Character } from "src/models/Character"


export class WeaponsDTO{
    weapon_id:number
    type:string
    name:string
    attack_bonus:number
    damage_dice:string
    damage_type:string
    properties:string
    other:string
    character:Character
}