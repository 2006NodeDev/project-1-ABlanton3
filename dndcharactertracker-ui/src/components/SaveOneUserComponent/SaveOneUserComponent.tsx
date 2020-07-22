import React, { FunctionComponent, SyntheticEvent, useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import {User} from '../../models/User'
import {toast} from 'react-toastify'
import { dndcharactertrackerSaveOneUser} from '../../remote/dndcharactertracker-api/dndcharactertracker-save-one-user'



export const SaveOneUserComponent: FunctionComponent<any> = () => {
    let [firstName, changeFirstName] = useState('')
    let [lastName, changeLastName] = useState('')
    let [username, changeUsername] = useState('')
    let [password, changePassword] = useState('')
    let [confirmPassword, changeConfirmPassword] = useState('')
    let [email, changeEmail] = useState('')
    let [image, changeImage] = useState(undefined)


    const updateFirstName = (e:any) => {
        e.preventDefault()
        changeFirstName(e.currentTarget.value)
    }
    const updateLastName = (e:any) => {
        e.preventDefault()
        changeLastName(e.currentTarget.value)
    }
    const updateUsername = (e:any) => {
        e.preventDefault()
        changeUsername(e.currentTarget.value)
    }
    const updatePassword = (e:any) => {
        e.preventDefault()
        changePassword(e.currentTarget.value)
    }
    const updateConfirmPassword = (e:any) => {
        e.preventDefault()
        changeConfirmPassword(e.currentTarget.value)
    }
    const updateEmail = (e:any) => {
        e.preventDefault()
        changeEmail(e.currentTarget.value)
    }

    const updateImage = (e:any) => {
        let file:File = e.currentTarget.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            console.log(reader.result)
            changeImage(reader.result)
        }
    }



    const submitUser = async (e: SyntheticEvent) => {
        e.preventDefault()
        if(password !== confirmPassword){
            toast.error('Password Do Not Match')
        }else {
            let newUser:User = {
                userId:0,
                username,
                password,
                firstName,
                lastName,
                email,
                role: '',
                image
            }
    
            let res = await dndcharactertrackerSaveOneUser(newUser)
        }   
    }


    return (
        <div>
            <form onSubmit={submitUser}>
                <TextField id="standard-basic" label="First Name" value={firstName || ''} onChange={updateFirstName} />
                <br></br>
                <TextField id="standard-basic" label="Last Name" value={lastName || ''} onChange={updateLastName} />
                <br></br>
                <TextField id="standard-basic" label="Username" value={username || ''} onChange={updateUsername} />
                <br></br>
                <TextField id="standard-basic" type='password' label="Password" value={password} onChange={updatePassword}/>
                <br></br>
                <TextField id="standard-basic" type='password' label="Confirm password" value={confirmPassword} onChange={updateConfirmPassword}/>
                <br></br>
                <TextField id="standard-basic" type='email' label="Email" value={email} onChange={updateEmail}/>
                <br></br>
                <label htmlFor='file'>Profile Pic</label>
                <input type='file' name='file' accept='image/*' onChange={updateImage} />
                <br></br>
                <img src={image} alt="user uploaded"/>
                <br></br>
                <Button variant="contained" type='submit'>Submit</Button>
            </form>
        </div>
    )
}