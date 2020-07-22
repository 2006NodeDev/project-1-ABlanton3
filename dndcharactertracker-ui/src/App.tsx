import React, { useState } from 'react';
import './App.css';
import { NavBarComponent } from './components/NavBarComponent/NavBarComponent';
import { LoginComponent } from './components/LoginComponent/LoginComponent';
import { SaveOneUserComponent } from './components/SaveOneUserComponent/SaveOneUserComponent';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { User } from './models/User';
import { ProfileComponent } from './components/ProfileComponent/ProfileComponent';
import { UpdateUserComponent } from './components/UpdateUserComponent/UpdateUserComponent';
import CharacterPageComponent from "./components/CharacterPageComponent/CharacterPageComponent"
import { CharacterDisplayComponent } from './components/CharacterDisplayComponent/CharacterDisplayComponent';




function App() {


  const [currentUser, changeCurrentUser] = useState<null | User>(null)
  return (
    <div className="App">
      <Router>
        <NavBarComponent user={currentUser}/>
        <Route path='/login' render={(props)=>(<LoginComponent changeCurrentUser={changeCurrentUser} {...props} />)} />
        <Route path='/signup' render={()=>(<SaveOneUserComponent/>)} />
        <Route path='/profile/:userId' component={ProfileComponent}/>
        <Route path ='/characters' component={CharacterPageComponent}/>
        <Route path="/editUser"><UpdateUserComponent/></Route>
      </Router>
    </div>
  );
}

export default App;
