import React, { FunctionComponent, SyntheticEvent, useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import {User} from '../../models/User'
import {toast} from 'react-toastify'
import { dndcharactertrackerUpdateUser } from '../../remote/dndcharactertracker-api/dndcharactertracker-update-user'


export const UpdateUserComponent: FunctionComponent<any> = (props) => {

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



    const updateUser = async (e: SyntheticEvent) => {
        e.preventDefault()
        if(password !== confirmPassword){
            toast.error('Password Do Not Match')
        }else if (!username){
            username= props.user.username
            let updatedUser:User = {
                userId:0,
                username,
                password,
                firstName,
                lastName,
                email,
                role: '',
                image
            }
            let res = await dndcharactertrackerUpdateUser(updatedUser)
        }else{
            let updatedUser:User = {
                userId:0,
                username,
                password,
                firstName,
                lastName,
                email,
                role: '',
                image
            }
            let res = await dndcharactertrackerUpdateUser(updatedUser)

        }   
    }


    return (
        <div>
            <form autoComplete="off" onSubmit={updateUser}  noValidate>
                <TextField id="standard-basic" label="First Name" value={firstName || ''} onChange={updateFirstName} />
                <TextField id="standard-basic" label="Last Name" value={lastName || ''} onChange={updateLastName} />
                <TextField id="standard-basic" label="Username" value={username || ''} onChange={updateUsername} />
                <TextField id="standard-basic" type='password' label="Password" value={password || ''} onChange={updatePassword}/>
                <TextField id="standard-basic" type='password' label="Confirm password" value={confirmPassword || ''} onChange={updateConfirmPassword}/>
                <TextField id="standard-basic" type='email' label="Email" value={email || ''} onChange={updateEmail}/>
                <label htmlFor='file'>Profile Pic</label>
                <input type='file' name='file' accept='image/*' onChange={updateImage} />
                <img src={image} alt="user uploaded"/>
                <Button variant="contained" type='submit' >Submit</Button>
            </form>
        </div>
    )
}


