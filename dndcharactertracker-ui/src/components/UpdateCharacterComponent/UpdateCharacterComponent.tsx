import React, { FunctionComponent, SyntheticEvent, useState } from 'react'
import { Button, TextField, Container, CssBaseline, Typography, Grid, withStyles, makeStyles } from '@material-ui/core'
import {toast} from 'react-toastify'
import { dndcharactertrackerUpdateCharacter } from '../../remote/dndcharactertracker-api/dndcharactertracker-update-character'
import { useParams } from 'react-router'
import { Character } from '../../models/Characters'



export const UpdateCharacterComponent: FunctionComponent<any> = (props) => {
    const classes = useStyles();
    let {characterId} = useParams()
    
    let [Name, changeName] = useState("")
    let [gender, changeGender] = useState("")
    let [dndClass, changeDndClass] = useState("")
    let [race, changeRace] = useState("")
    let [confirmRace, changeConfirmRace] = useState("")
    let [background, changeBackground] = useState("")
    let [alignment, changeAlignment] = useState("")
    let [level, changeLevel] = useState(undefined)
    let [other, changeOther] = useState("")
    let [user, changeUser] = useState(undefined)


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




    const updateUser = async (e: SyntheticEvent) => {
        e.preventDefault()
        if(props.user.userId != user){
            toast.error('You cannot change this character')
        }else{
            let updatedCharacter:Character = {
                characterId,
                name,
                gender,
                dndClass,
                race,
                background,
                alignment,
                level,
                other,
                user
            }
            let res = await dndcharactertrackerUpdateCharacter(updatedCharacter)
        }   
    }


    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Update Character
          </Typography>
          <form autoComplete="off" onSubmit={updateUser} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField autoComplete="off"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="name"
                  label="New Name"
                  name="name"
                  value={name}
                  onChange={updateName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField autoComplete="off"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="gender"
                  label="New Gender"
                  type="gender"
                  id="gender"
                  value={gender}
                  onChange={updateGender}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField autoComplete="off"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="dndClass"
                  label="New DnD Class"
                  type="dndclass"
                  id="dndClass"
                  value={dndClass}
                  onChange={updateDndClass}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField autoComplete="off"
                  variant="outlined"
                  fullWidth
                  id="race"
                  label="Change Race"
                  name="race"
                  value={race}
                  onChange={updateRace}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField autoComplete="off"
                  variant="outlined"
                  fullWidth
                  id="background"
                  label="Change Background"
                  name="background"
                  value={background}
                  onChange={updateBackground}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField autoComplete="off"
                  variant="outlined"
                  fullWidth
                  id="alignment"
                  label="Change Alignment"
                  name="alignment"
                  value={alignment}
                  onChange={updateAlignment}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField autoComplete="off"
                  variant="outlined"
                  fullWidth
                  id="level"
                  label="Change Level"
                  name="level"
                  value={level}
                  onChange={updateLevel}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField autoComplete="off"
                  variant="outlined"
                  fullWidth
                  id="other"
                  label="Change Other Information"
                  name="other"
                  value={other}
                  onChange={updateOther}
                />
              </Grid>
              <Grid>
                <CustomButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                > Update
                </CustomButton>
              </Grid>
            </Grid>            
          </form>
        </div>
      </Container>
    )
}

const CustomButton = withStyles((theme) => ({
  root: {
      color: theme.palette.getContrastText('#ff3333'),
      backgroundColor: "#8B0000",
      '&:hover': {
        backgroundColor: '#8B0000',
      },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: '#ff3333',
      color: 'white',
      fontSize: 16
    },
    media: {

    }
}));