import React, {useState} from 'react';
import './App.css';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Home from './components/Home/Home';
import PrivateRoute from './utils/PrivateRoute';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Dashboard, About, Contact } from "./";
import AlertComponent from './components/AlertComponent/AlertComponent'; 


function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  var token = localStorage.getItem('login_access_token');
  token=10;
  console.log('Token: '+token);
  if(token!=null)
  {
    return (
    
      <Router>
      <div className="App">
        <Header title={title}/>
          <div className="container d-flex align-items-center flex-column">
            <Switch>
              <Route path="/" exact={true}>
                <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
              </Route>
              <Route path="/register">
                <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
              </Route>
              <Route path="/login">
                <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
              </Route>
              <PrivateRoute path="/home">
                <Home/>
              </PrivateRoute>
            </Switch>
            <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
          </div>
      </div>
      </Router>
    );
  }
  else
  {
    return(<Router>
      <Navigation />
      <Switch>
        {/* <Route path="/Dashboard" exact component={() => <Dashboard />} /> */}
        <Route path="/about" exact component={() => <About />} />
        <Route path="/contact" exact component={() => <Contact />} />
      </Switch>
      <Footer />
    </Router>);
  }
  
  
  
}

export default App;