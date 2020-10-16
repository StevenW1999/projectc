import React from 'react';
import './App.css';
import Home from './pages/home/Home';
import {Navigation} from './components/Navigation'
import Footer from './components/Footer';
import {Layout} from './components/Layout';
import About from './pages/about/About';

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
      <Layout>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" component ={Home}/>
          <Route exact path="/About" component ={About}/>
        </Switch>
      </Router>
      <Footer/>
      </Layout>
    </React.Fragment>
    </div>
  );
}

export default App;
