import React, { useState } from 'react';
import './App.css';
import { NavBarComponent } from './components/NavBarComponent/NavBarComponent';
import { LoginComponent } from './components/LoginComponent/LoginComponent';
import { SaveOneUserComponent } from './components/SaveOneUserComponent/SaveOneUserComponent';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { User } from './models/User';
import { ProfileComponent } from './components/ProfileComponent/ProfileComponent';
import Header from './components/HeaderComponent/HeaderComponent';
import { FancyBorder } from './components/FancyBorderComponent/FancyBorder';
import { createMuiTheme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';



function App() {
  const theme = createMuiTheme({
    palette: {
        primary: red
    },   
})

  const [currentUser, changeCurrentUser] = useState<null | User>(null)
  return (
    <div className="App">
      <Router>
        <NavBarComponent user={currentUser}/>
        <Route path='/login' render={(props)=>(<LoginComponent changeCurrentUser={changeCurrentUser} {...props} />)} />
        <Route path='/signup' render={()=>(<SaveOneUserComponent/>)} />
        <Route path='/profile/:userId' component={ProfileComponent}/>
      </Router>
      <FancyBorder>
      <Header/>
      </FancyBorder>

    </div>
  );
}

export default App;
