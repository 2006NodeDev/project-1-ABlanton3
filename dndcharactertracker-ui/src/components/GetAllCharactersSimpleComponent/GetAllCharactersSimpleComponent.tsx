import React, { FunctionComponent, useEffect, useState } from 'react'
import { Character } from '../../models/Characters'
import { dndcharactertrackerGetCharacterByUser } from '../../remote/dndcharactertracker-api/dndcharactertracker-get-characters-by-user'
import { CharacterDisplayComponent } from '../CharacterDisplayComponent/CharacterDisplayComponent'


export const AllUsersCharactersSimpleComponent:FunctionComponent<any> = (props) => {


    let [allCharacters, changeAllCharacters] = useState([])
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
        return <CharacterDisplayComponent character={characters}/>
    })

    return(
        <div>
            {characterDisplays}
        </div>
    )
}