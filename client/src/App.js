import React from 'react';
import './App.css';
import Home from './pages/home/Home';
import {Navigation} from './components/Navigation'
import Footer from './components/Footer';
import About from './pages/about/About';
import ProductPage from './pages/productpage/ProductPage';
import Create_trade from './pages/Create_trade/Create_trade';

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
          <Route exact path="/Create_trade" component ={Create_trade}/>
        </Switch>
      </Router>
      <Footer/>

    </Layout>
  );
}

export default App;
