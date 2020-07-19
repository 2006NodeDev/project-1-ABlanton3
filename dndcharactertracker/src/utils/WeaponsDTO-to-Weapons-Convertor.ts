import { WeaponsDTO } from "src/dtos/weapons-dto";
import { Weapon } from "src/models/Weapon";

export function WeaponsDTOtoWeaponsConvertor(wdto:WeaponsDTO):Weapon{
    return{
        weaponId:wdto.weapon_id,
        name:wdto.name,
        type:wdto.type,
        attackBonus:wdto.attack_bonus,
        damageDice:wdto.damage_dice,
        damageType:wdto.damage_type,
        properties:wdto.properties,
        other:wdto.other,
        character:wdto.character
    }
}