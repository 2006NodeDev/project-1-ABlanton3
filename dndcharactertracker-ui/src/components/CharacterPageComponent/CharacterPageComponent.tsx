import React from 'react'
/*import { ButtonGroup, Button, makeStyles } from '@material-ui/core';
import { Link, Router } from 'react-router-dom';
import { SaveOneCharacterComponent } from '../AddNewCharacterComponent/AddNewCharacterComponent';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(10, 80, 10, 80),
      },
    },
  }));
  
export default function CharacterPageComponent() {
    const classes = useStyles();

    
    return (
    <Router history={history}>
      <div className={classes.root}>
        <ButtonGroup
            orientation="vertical"
            color="primary"
            aria-label="vertical contained primary button group"
            variant="contained"
        >
          <Button component={SaveOneCharacterComponent} to='/addCharacter'>Add New Character</Button>
          <Button>Update Existing Character</Button>
          <Button>Search for Character by ID</Button>
          <Button>View All Characters by a User</Button>
         </ButtonGroup>
        </div>
      </Router>
    )
}*/

/*import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { SaveOneCharacterComponent } from "../AddNewCharacterComponent/AddNewCharacterComponent";
import { GetCharacterByIdComponent} from "../GetCharacterByIdComponent/GetCharacterByIdComponent";
import {AllUsersCharactersFullComponent} from "../GetAllCharactersFullComponent/GetAllCharactersFullComponent";
import {AllUsersCharactersSimpleComponent} from "../GetAllCharactersSimpleComponent/GetAllCharactersSimpleComponent";
import {UpdateCharacterComponent} from "../CharacterPageComponent/UpdateCharacterComponent"

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/addCharacter">Add a New Character</Link>
            </li>
            <li>
              <Link to="/updateCharacter">Update Character</Link>
            </li>
            <li>
              <Link to="/characterById">Search for a Character With Character ID</Link>
            </li>
            <li>
              <Link to="/characterByIdFull">Search for a Character With User ID Full Detail</Link>
            </li>
            <li>
              <Link to="/charactersByUser">Search for a User's Characters Simple Detail</Link>
            </li>
          </ul>
        </nav>


        <Switch>
          <Route path="/addCharacter">
            <SaveOneCharacterComponent />
          </Route>
          <Route path="/updateCharacter">
            <UpdateCharacterComponent/>
          </Route>
          <Route path="/characterById">
            <GetCharacterByIdComponent/>
          </Route>
          <Route path="/characterByIdFull">
            <AllUsersCharactersFullComponent />
          </Route>
          <Route path="/characterByUser">
            <AllUsersCharactersSimpleComponent/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}*/
