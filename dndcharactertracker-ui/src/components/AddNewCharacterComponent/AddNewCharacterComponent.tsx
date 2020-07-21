import React, { FunctionComponent, SyntheticEvent, useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import {Character} from '../../models/Characters'
import { dndcharactertrackerSaveOneCharacter } from '../../remote/dndcharactertracker-api/dndcharactertracker-save-one-character'



export const SaveOneCharacterComponent: FunctionComponent<any> = () => {
    let [name, changeName] = useState('')
    let [gender, changeGender] = useState('')
    let [dndClass, changeDndClass] = useState('')
    let [race, changeRace] = useState('')
    let [background, changeBackground] = useState('')
    let [alignment, changeAlignment] = useState('')
    let [level, changeLevel] = useState(0)
    let [other, changeOther] = useState('')
    let [user, changeUser] = useState(0)


    const updateName = (e:any) => {
        e.preventDefault()
        changeName(e.currentTarget.value)
    }
    const updateGender = (e:any) => {
        e.preventDefault()
        changeGender(e.currentTarget.value)
    }
    const updateDndClass = (e:any) => {
        e.preventDefault()
        changeDndClass(e.currentTarget.value)
    }
    const updateRace = (e:any) => {
        e.preventDefault()
        changeRace(e.currentTarget.value)
    }
    const updateBackground = (e:any) => {
        e.preventDefault()
        changeBackground(e.currentTarget.value)
    }
    const updateAlignment = (e:any) => {
        e.preventDefault()
        changeAlignment(e.currentTarget.value)
    }
    const updateLevel = (e:any) => {
        e.preventDefault()
        changeLevel(e.currentTarget.value)
    }
    const updateOther = (e:any) => {
        e.preventDefault()
        changeOther(e.currentTarget.value)
    }
    const updateUser = (e:any) => {
        e.preventDefault()
        changeUser(e.currentTarget.value)
    }



    const submitCharacter = async (e: SyntheticEvent) => {
            let newCharacter:Character = {
                characterId:0,
                name,
                gender,
                dndClass,
                race,
                background,
                alignment,
                level, 
                other,
                user,
            }
    
            let res = await dndcharactertrackerSaveOneCharacter(newCharacter)
        }   


    return (
        <div>
            <form onSubmit={submitCharacter}>
                <TextField id="standard-basic" label="Character Name" value={name || ''} onChange={updateName} />
                <TextField id="standard-basic" label="Gender" value={gender || ''} onChange={updateGender} />
                <TextField id="standard-basic" label="Class" value={dndClass || ''} onChange={updateDndClass} />
                <TextField id="standard-basic" label="Race" value={race} onChange={updateRace}/>
                <TextField id="standard-basic" label="Background" value={background} onChange={updateBackground}/>
                <TextField id="standard-basic" label="Alignment" value={alignment} onChange={updateAlignment}/>
                <TextField id="standard-basic" label="Level" value={level} onChange={updateLevel}/>
                <TextField id="standard-basic" label="Other Information" value={other || ''} onChange={updateOther}/>
                <TextField id="standard-basic" label="User ID" value={user} onChange={updateUser}/>
                <Button variant="contained" type='submit'>Submit</Button>
            </form>
        </div>
    )
}