import React, { FunctionComponent, useEffect, useState } from 'react'
import { Character } from '../../models/Characters'
import { CharacterDisplayComponent } from '../CharacterDisplayComponent/CharacterDisplayComponent'
import { dndcharactertrackerGetFullCharacterInfo } from '../../remote/dndcharactertracker-api/dndcharactertracker-get-full-character'


export const AllUsersCharactersFullComponent:FunctionComponent<any> = (props) => {


    let [allFullCharacters, changeAllFullCharacters] = useState<Character[]>([])
    useEffect(()=>{

        const getCharacters = async ()=>{
            let response = await dndcharactertrackerGetFullCharacterInfo(props)
            changeAllFullCharacters(response)
        }
        if(allFullCharacters.length === 0){
            getCharacters()
        }
    })

    let characterDisplays = allFullCharacters.map((characters)=>{
        return <CharacterDisplayComponent key={'character-key-' + characters.characterId} character={characters}/>
    })

    return(
        <div>
            {characterDisplays}
        </div>
    )
}