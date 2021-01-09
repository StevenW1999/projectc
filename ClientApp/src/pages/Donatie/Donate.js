import React, { Component } from 'react';
import './Donate.css';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';

class Donate extends Component{

  render() {
    return (
        <div className="Donatie">
            <div class="donimage">
                <img src="https://st.depositphotos.com/1141099/4488/i/950/depositphotos_44883751-stock-photo-big-nursery.jpg" class="rounded" /> 
            </div>
            <div class="don-title">
                Wilt u graag een bijdragen leveren?
            </div>
            <div class="don-text">
            Ga naar de website van Stadskwekerij de Kas en leer meer.
            </div>
            <form action="https://stadskwekerijdekas.nl">
                <button class="button">Lees meer</button>  
            </form> 
        </div>
    );
  }
}

export default Donate;