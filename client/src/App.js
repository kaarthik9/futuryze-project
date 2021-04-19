import React, { useState } from 'react'
import styles from "./App.css";
import Header from './components/Header/Header';
import Contacts from './components/Contacts/Contacts';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import * as api from "./api/index"
import SignUpForm from './components/Forms/SignUpForm/SignUpForm';

export default function App() {

  const [authData, setAuthData] = useState(null)
  document.title = 'FutureX'

  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={() => <SignUpForm authData={authData} setAuthData={setAuthData} />} />
          <Route path="/contacts" component={Contacts} />
        </Switch>
      </div>
    </Router>
  )
}
