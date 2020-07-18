import React, { FunctionComponent, useState } from 'react'
import Button from '@material-ui/core/Button'
import { TitleComponent } from '../TitleComponent/TitleComponent'
import { User } from '../../models/User'
import {Redirect} from 'react-router-dom'


interface IClickerProps{
    user:User|null
}

export const ClickerComponent: FunctionComponent<IClickerProps> = (props) => {

    const [clicks, changeClicks] = useState(0)

    return (
        (props.user) ?
        <div>
            <TitleComponent size='small' title={`Welcome ${props.user.username}! you have ${clicks} number of clicks`} />
            <Button variant="contained" color="primary" onClick={()=>(changeClicks(clicks + 1))}>                
                Click
            </Button>
        </div>
        :
        <Redirect to='/login'/>
    )


}