import { User } from "./User"

export class Character{
    characterId: number
    name: string
    gender: string
    dndClass: string
    race: string
    background: string
    alignment: string
    level: number
    other: string
    user: User
}