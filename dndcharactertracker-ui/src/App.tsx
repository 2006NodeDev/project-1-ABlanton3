import React, { useState } from 'react';
import './App.css';
import { NavBarComponent } from './components/NavBarComponent/NavBarComponent';
import { LoginComponent } from './components/LoginComponent/LoginComponent';
import { SaveOneUserComponent } from './components/SaveOneUserComponent/SaveOneUserComponent';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { User } from './models/User';
import { ProfileComponent } from './components/ProfileComponent/ProfileComponent';



function App() {
  const [currentUser, changeCurrentUser] = useState<null | User>(null)
  return (
    <div className="App">
      <Router>
        <NavBarComponent user={currentUser}/>
        <Route path='/login' render={(props)=>(<LoginComponent changeCurrentUser={changeCurrentUser} {...props} />)} />
        <Route path='/signup' render={(props)=>(<SaveOneUserComponent/>)} />
        <Route path='/profile/:userId' component={ProfileComponent}/>
      </Router>

    </div>
  );
}

export default App;
