import React from 'react';
import './App.css';
import Home from './pages/home/Home';
import {Navigation} from './components/Navigation'
import Footer from './components/Footer';
import About from './pages/about/About';
import ProductPage from './pages/productpage/ProductPage';
import AccountCreate from './pages/accountCreate/AccountCreate';
import Account from './pages/account/Account';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { Layout } from './components/Layout';

function App() {
  return (
    <Layout>

      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" component ={Home}/>
          <Route exact path="/About" component ={About}/>
          <Route exact path="/ProductPage" component ={ProductPage}/>
          <Route exact path="/Login" component ={AccountCreate}/>
          <Route exact path="/Account" component ={Account}/>
        </Switch>
      </Router>
      <Footer/>

    </Layout>
  );
}

export default App;
