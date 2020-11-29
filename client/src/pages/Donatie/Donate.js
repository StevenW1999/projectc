import React, { Component } from 'react';

class Donate extends Component{

render() {
    return (  
      <div className="Donatie">  
        <div className="Bedrag">
          <p>Kies een bedrag</p>
          <input type = "radio"checked="checked" name="radio"/>€ 1.00 
          <input type = "radio"checked="checked" name="radio"/>€ 5.00 
          <input type = "radio"checked="checked" name="radio"/>€ 10.00
          <br/>
          <input type = "radio" checked="checked" name="radio"/> 
          <input type="number" id="quantity" name="quantity" min="1" max="1000" size = "24"/>
        </div>
        <div className="Betaalwijze">
          <form>
          <input type = "radio"checked="checked" name="radio"/>Eenmalige Incasso 
          <input type = "radio"checked="checked" name="radio"/>Ideal 
          </form>
          <form>
          <input type = "radio"checked="checked" name="radio"/>Mevrouw 
          <input type = "radio"checked="checked" name="radio"/>Meneer 
          </form>
          Ter name van: <input type="text"size ="50"/><br/>
          Email: <input type="text" size = "50"/><br/>
          Geboortedatum: <input type="text"/>Telefoonnummer: <input type="text"/>
        </div>
      </div>
    )
  }
}

export default Donate;