import React, { FunctionComponent } from 'react'
import Typography from '@material-ui/core/Typography'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import { CardContent, Card} from '@material-ui/core';
import { Character } from '../../models/Characters';
import { Statistics } from '../../models/Statistics';
import {Weapon} from '../../models/Weapons'

interface IFullCharacterDisplayProps{
    character:Character
    stats:Statistics
    weapon:Weapon
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




export const FullCharacterDisplayComponent:FunctionComponent<IFullCharacterDisplayProps> = (props)=>{
    let classes = useStyles()
    return(
      <div>
        <Card className={classes.root}>
            <CardContent>
                <Typography variant='body1'>
                   Name : {props.character.name}
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
                <Typography variant='body1'>
                   HP : {props.stats.healthPoints}
                </Typography>
                <Typography variant='body1'>
                   AC : {props.stats.armorClass}
                </Typography>
                <Typography variant='body1'>
                   Strength : {props.stats.strength}
                </Typography>
                <Typography variant='body1'>
                   Dexterity : {props.stats.dexterity}
                </Typography>
                <Typography variant='body1'>
                   Constitution : {props.stats.constitution}
                </Typography>
                <Typography variant='body1'>
                   Intelligence : {props.stats.intelligence}
                </Typography>
                <Typography variant='body1'>
                   Wisdom : {props.stats.wisdom}
                </Typography>
                <Typography variant='body1'>
                   Charisma : {props.stats.charisma}
                </Typography>
                <Typography variant='body1'>
                   Other: {props.stats.other}
                </Typography>
                <Typography variant='body1'>
                   Type : {props.weapon.type}
                </Typography>
                <Typography variant='body1'>
                   Weapon Name : {props.weapon.name}
                </Typography>
                <Typography variant='body1'>
                   Attack Bonus : {props.weapon.attackBonus}
                </Typography>
                <Typography variant='body1'>
                   Damage Dice : {props.weapon.damageDice}
                </Typography>
                <Typography variant='body1'>
                   Damage Type : {props.weapon.damageType}
                </Typography>
                <Typography variant='body1'>
                   Properties : {props.weapon.properties}
                </Typography>
                <Typography variant='body1'>
                   Other : {props.weapon.other}
                </Typography>
                <Button variant='contained' color='inherit'>Edit</Button>
            </CardContent>
        </Card>
      </div>
    )
}