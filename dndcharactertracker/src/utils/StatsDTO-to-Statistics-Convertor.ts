import { StatsDTO } from "src/dtos/stats-dto";
import { Statistics } from "src/models/Statistics";


 export function StatsDTOtoStatisticsConvertor(sdto:StatsDTO):Statistics{
    return{
        statId: sdto.stat_id,
        character: sdto.character,
        healthPoints: sdto.hp,
        armorClass: sdto.ac,
        strength: sdto.strength,
        dexterity: sdto.dexterity,
        constitution: sdto.constitution,
        intelligence: sdto.intelligence,
        wisdom: sdto.wisdom,
        charisma: sdto.charisma,
        other: sdto.other
    }
}