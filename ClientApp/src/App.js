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
import AccountEdit from './pages/accountEdit/AccountEdit';
import AccountUser from './pages/accountUser/AccountUser';
import AccountUserAdmin from './pages/accountUserAdmin/AccountUserAdmin';
import Login from './pages/login/Login';
import AdminLogin from './pages/adminlogin/AdminLogin';
import AdminPanel from './pages/adminpanel/AdminPanel';
import Donatie from './pages/Donatie/Donate'
import Contact from './pages/contact/Contact'
import Editplant from './pages/EditPlant/Editplant';
import Voorwaarden from './pages/voorwaarden/Voorwaarden';

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
        <Route exact path="/Login" component ={Login}/>
        <Route exact path="/AdminLogin" component ={AdminLogin}/>
        <Route exact path="/Account" component ={Account}/>
        <Route exact path="/AccountCreate" component ={AccountCreate}/>
        <Route exact path="/AccountEdit" component ={AccountEdit}/>
        <Route exact path="/AccountUser" component ={AccountUser}/>
        <Route exact path="/AccountUserAdmin" component ={AccountUserAdmin}/>
        <Route exact path="/Create_trade" component={Create_trade} />
        <Route exact path="/Editplant" component={Editplant} />
        <Route exact path="/AdminPanel" component={AdminPanel} />
        <Route exact path="/Donate" component={Donatie} />
        <Route exact path="/Contact" component={Contact} />
        <Route exact path="/Voorwaarden" component={Voorwaarden} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
