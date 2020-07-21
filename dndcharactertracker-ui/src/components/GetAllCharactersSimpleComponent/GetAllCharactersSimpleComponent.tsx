import React, { FunctionComponent, useEffect, useState } from 'react'
import { Character } from '../../models/Characters'
import { dndcharactertrackerGetCharacterByUser } from '../../remote/dndcharactertracker-api/dndcharactertracker-get-characters-by-user'
import { CharacterDisplayComponent } from '../CharacterDisplayComponent/CharacterDisplayComponent'


export const AllUsersCharactersSimpleComponent:FunctionComponent<any> = (props) => {


    let [allCharacters, changeAllCharacters] = useState<Character[]>([])
    useEffect(()=>{

        const getAllCharactersSimpleComponent = async ()=>{
            let response = await dndcharactertrackerGetCharacterByUser(props)
            changeAllCharacters(response)
        }
        if(allCharacters.length === 0){
            getAllCharactersSimpleComponent()
        }
    })

    let characterDisplays = allCharacters.map((characters)=>{
        //whwenever you make a bunch of components like this
        // react agressively suggests you give them unqie keys so it can tell them apart
        return <CharacterDisplayComponent key={'character-key-' + characters.characterId} character={characters}/>
    })

    return(
        //we should turn this into a grid to make it look nicer
        <div>
            {characterDisplays}
        </div>
    )
}