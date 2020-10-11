import React from 'react';
import './App.css';
import Home from './pages/home/Home';
import {Navigation} from './components/Navigation'
import Footer from './components/Footer';
import {Layout} from './components/Layout';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className ="parent">
    <React.Fragment>
      <Router>
        <Navigation />
        <Layout>
        <Switch>
          <Route exact path="/" component ={Home}/>
        </Switch>
        </Layout>
      </Router>
      <Footer/>
    </React.Fragment>
    </div>
  );
}

export default App;
