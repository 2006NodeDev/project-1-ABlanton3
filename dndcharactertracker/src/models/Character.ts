import { User } from "./User"

export class Character{
    characterId: number
    name: string
    class: string
    race: string
    background: string
    alignment: string
    other: string
    user: User
}