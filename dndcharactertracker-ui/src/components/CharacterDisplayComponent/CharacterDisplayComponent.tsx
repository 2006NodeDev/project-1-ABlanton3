import React, { FunctionComponent } from 'react'
import Typography from '@material-ui/core/Typography'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import { CardContent, Card} from '@material-ui/core';
import { Character } from '../../models/Characters';

interface ICharacterDisplayProps{
    character:Character
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
        backgroundColor:'black'
    },
    text:{
        color:'white'
    }
  }),
);




export const CharacterDisplayComponent:FunctionComponent<ICharacterDisplayProps> = (props)=>{
    let classes = useStyles()
    return(
      <div>
        <Card className={classes.root}>
            <CardContent>
                <Typography variant='body1'>
                   Name : {props.character.characterName}
                </Typography>
                <Typography variant='body1'>
                   Gender : {props.character.gender}
                </Typography>
                <Typography variant='body1'>
                   Class : {props.character.dndClass}
                </Typography>
                <Typography variant='body1'>
                   Race : {props.character.race}
                </Typography>
                <Typography variant='body1'>
                   Background: {props.character.background}
                </Typography>
                <Typography variant='body1'>
                   Alignment : {props.character.alignment}
                </Typography>
                <Typography variant='body1'>
                   Level : {props.character.level}
                </Typography>
                <Typography variant='body1'>
                   Other : {props.character.other}
                </Typography>
                <Button variant='contained' color='inherit'>Edit</Button>
            </CardContent>
        </Card>
      </div>
    )
}