import React from "react";
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
import {UpdateCharacterComponent} from "../UpdateCharacterComponent/UpdateCharacterComponent"

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
              <Link to="/characterByUser">Search for a User's Characters</Link>
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
}


/*            <li>
<Link to="/characterByIdFull">Search for a Character With User ID Full Detail</Link>
</li>
<li>
  <Link to="/charactersByUser">Search for a User's Characters Simple Detail</Link>
</li> */ //These don't work, try to implement later