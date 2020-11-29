import React from 'react';
import './App.css';
import Home from './pages/home/Home';
import Navigation from './components/Navigation'
import Footer from './components/Footer';
import About from './pages/about/About';
import ProductPage from './pages/productpage/ProductPage';
import Create_trade from './pages/Create_trade/Create_trade';
import Searchresults from './pages/searchresults/Searchresults';
import AccountCreate from './pages/accountCreate/AccountCreate';
import Account from './pages/account/Account';
import AdminPanel from './pages/adminpanel/AdminPanel';
import Test from './pages/Test/Test';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/About" component={About} />
        <Route exact path="/ProductPage" component={ProductPage} />
        <Route exact path="/Search" component={Searchresults} />
        <Route exact path="/Login" component ={AccountCreate}/>
        <Route exact path="/Account" component ={Account}/>
        <Route exact path="/Create_trade" component ={Create_trade}/>
        <Route exact path="/Search" component={Searchresults} />
        <Route exact path="/AdminPanel" component={AdminPanel} />
        <Route exact path="/Test" component={Test}/>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
