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

        //we only call that function of we haven't already called it
        if(characterById.length === 0){
            //get the users
            //update the state with those users
            getCharacterByID()
        }
    })

    //this is one of the coolest things about react
    //map data into components and then put them into the jsx
    let characterByIdDisplays = characterById.map((character)=>{
        //whwenever you make a bunch of components like this
        // react agressively suggests you give them unqie keys so it can tell them apart
        return <CharacterDisplayComponent key={'character-key-' + character.characterId} character={character}/>
    })

    return(
        //we should turn this into a grid to make it look nicer
        <div>
            {characterByIdDisplays}
        </div>
    )
}