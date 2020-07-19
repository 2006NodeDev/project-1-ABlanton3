import { Character } from "./Character"


export class Weapon{
    weaponId:number
    type:string
    name:string
    attackBonus:number
    damageDice:string
    damageType:string
    properties:string
    other:string
    character:Character
}