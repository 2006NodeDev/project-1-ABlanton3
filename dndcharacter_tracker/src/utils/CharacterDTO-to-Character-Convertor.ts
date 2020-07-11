import { CharacterDTO } from "../dtos/character-dto";
import { Character } from "../models/Character"


export function CharacterDTOtoCharacterConvertor(cdto:CharacterDTO):Character{
    return{
        characterId:cdto.character_id,
        name:cdto.name,
        class:cdto.class,
        race:cdto.race,
        background:cdto.background,
        alignment:cdto.alignment,
        other:cdto.other,
        user:cdto.user
    }
}