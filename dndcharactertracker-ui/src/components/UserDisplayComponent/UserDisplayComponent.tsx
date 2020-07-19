import React, { FunctionComponent } from 'react'
import { User } from '../../models/User'
import Typography from '@material-ui/core/Typography'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import { CardContent, Card} from '@material-ui/core';

interface IUserDisplayProps{
    user:User
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      justifyContent: "center",
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(20),
        height: theme.spacing(17),
      },
    },
    card:{
        backgroundColor:'grey' 
    }
  }),
);




export const UserDisplayComponent:FunctionComponent<IUserDisplayProps> = (props)=>{
    let classes = useStyles()
    return(
      <div>
        <Card className={classes.root}>
            <CardContent>
                <Typography variant='body1'>
                   Username : {props.user.username}
                </Typography>
                <Typography variant='body1'>
                   First Name : {props.user.firstName}
                </Typography>
                <Typography variant='body1'>
                   Last Name : {props.user.lastName}
                </Typography>
                <Typography variant='body1'>
                   Email : {props.user.email}
                </Typography>
                <Typography variant='body1'>
                   Role : {props.user.role}
                </Typography>
                <Typography variant='body1'>
                   Image : {props.user.image}
                </Typography>
                <Button variant='contained' color='inherit'>Edit</Button>
            </CardContent>
        </Card>
      </div>
    )
}