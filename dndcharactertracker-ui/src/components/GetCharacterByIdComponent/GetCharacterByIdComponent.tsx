import React, { FunctionComponent, useEffect, useState } from 'react'
import { Character } from '../../models/Characters'
import { dndcharactertrackerGetCharacterById } from '../../remote/dndcharactertracker-api/dndcharactertracker-get-character-by-id'
import { CharacterDisplayComponent } from '../CharacterDisplayComponent/CharacterDisplayComponent'


export const GetCharacterByIdComponent:FunctionComponent<any> = (props) => {

 
    let [characterById, changeCharacterById] = useState<Character[]>([])

    useEffect(()=>{
        const getCharacterByID = async ()=>{
            let response = await dndcharactertrackerGetCharacterById(props)
            changeCharacterById(response)
        }


        if(characterById.length === 0){

            getCharacterByID()
        }
    })


    let characterByIdDisplays = characterById.map((character)=>{

        return <CharacterDisplayComponent key={'character-key-' + character.characterId} character={character}/>
    })

    return(

        <div>
            {characterByIdDisplays}
        </div>
    )
}