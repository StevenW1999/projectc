import React, { Component } from 'react';

class Test extends Component{
render () {
  return (
    <div class="container">
        <h1>Maak een plantenruil aan</h1>
        <form>
            <div class="form-group">
                <label for="Title">Title</label>
                <input type="title" class="form-control" id="Title" placeholder="Title"/>
            </div>
            <div class="form-group">
                <label for="Plaats">Plaats</label>
                <input type="plaats" class="form-control" id="Plaats" placeholder="Plaats"/>
            </div> 
            <div class="form-group">
                <label for="Omschrijving">Omschrijving</label>
                <input type="omschrijving" class="form-control" id="Omschrijving" placeholder="Omschrijving"/>
            </div> 
            <div className="Vast">
              <p>Vaste plant</p>
              Ja: <input type = "radio"checked="checked" name="radio"/>
              Nee: <input type = "radio"checked="checked" name="radio"/>
            </div>
            <div class="form-group">
                <label for="inputsoort">Soort</label>
                <select class="form-control" >
                    <option selected value> -- Kies een categorie -- </option>
                    <option>Bomen</option>
                    <option>Struiken</option>
                    <option>Kruidachtige</option>
                    <option>Bodemdekkers</option>
                    <option>Klimplanten</option>
                    <option>Vijverplanten</option>
                </select>
            </div> 
            <div class="form-group">
                <label for="inputstand">Standplaats</label>
                <select class="form-control" >
                    <option selected value> -- Kies een categorie -- </option>
                    <option >Zon</option>
                    <option >Half schaduw</option>
                    <option >Schaduw</option>
                    <option >Stelt geen eisen</option>
                </select>
            </div>
            <div class="form-group">
                <label for="inputwater">Water</label>
                <select class="form-control" >
                    <option selected value> -- Kies een categorie -- </option>
                    <option >Nat</option>
                    <option >Gemiddeld</option>
                    <option >Droog</option>
                    <option >Stelt geen eisen</option>
              </select>
            </div>
            <div className="Bodem">
              <p>Bodem</p>
              Ja: <input type = "radio"checked="checked" name="radio"/>
              Nee: <input type = "radio"checked="checked" name="radio"/>
            </div>
            <div class="form-group">
                <label for="inputgroei">Groeihoogte</label>
                <select class="form-control" >
                    <option selected value> -- Kies een categorie -- </option>
                    <option >0 - 20 cm</option>
                    <option >20 - 40 cm</option>
                    <option >40 - 70 cm</option>
                    <option >70 - 100 cm</option>
                    <option >100 - 120 cm</option>
                    <option >120 - 150 cm</option>
                    <option >1.5 - 2 m</option>
                    <option >hoger dan 2 m</option>
              </select>
            </div>
            <div class="form-group">
                <label for="inputkleur">Bloemkleur</label>
                <select class="form-control" >
                    <option selected value> -- Kies een categorie -- </option>
                    <option >Blauw</option>
                    <option >Geel</option>
                    <option >Oranje</option>
                    <option >Paars</option>
                    <option >Rood</option>
                    <option >Roze</option>
                    <option >Violetblauw</option>
                    <option >Wit</option>
                    <option >Zwart</option>
                    <option >anders</option>
              </select>
              </div>
              <div class="form-group">
                <label for="inputbloei">Bloeiperiode</label>
                <select class="form-control" >
                    <option selected value> -- Kies een categorie -- </option>
                    <option >Januari</option>
                    <option >Februari</option>
                    <option >Maart</option>
                    <option >April</option>
                    <option >Mei</option>
                    <option >Juni</option>
                    <option >Juli</option>
                    <option >Augustus</option>
                    <option >September</option>
                    <option >Oktober</option>
                    <option >November</option>
                    <option >December</option>
              </select>
              <br></br>
              <select class="form-control" >
                    <option selected value> -- Kies een categorie -- </option>
                    <option >Januari</option>
                    <option >Februari</option>
                    <option >Maart</option>
                    <option >April</option>
                    <option >Mei</option>
                    <option >Juni</option>
                    <option >Juli</option>
                    <option >Augustus</option>
                    <option >September</option>
                    <option >Oktober</option>
                    <option >November</option>
                    <option >December</option>
              </select>
            </div>
            <div class="form-group">
                <label for="inputkenmerk">Speciale kenmerken</label>
                <select class="form-control" >
                    <option selected value> -- Kies een categorie -- </option>
                    <option >Geurend</option>
                    <option >Eetbaar</option>
                    <option >Giftig</option>
                    <option >Trekt bijen aan</option>
                    <option >Trekt hommels aan</option>
                    <option >Trekt vlinders aan</option>
                    <option >Trekt vogels aan</option>
              </select>
              <br></br>
              <select class="form-control" >
                    <option selected value> -- Kies een categorie -- </option>
                    <option >Geurend</option>
                    <option >Eetbaar</option>
                    <option >Giftig</option>
                    <option >Trekt bijen aan</option>
                    <option >Trekt hommels aan</option>
                    <option >Trekt vlinders aan</option>
                    <option >Trekt vogels aan</option>
              </select>
              <br></br>
              <select class="form-control" >
                    <option selected value> -- Kies een categorie -- </option>
                    <option >Geurend</option>
                    <option >Eetbaar</option>
                    <option >Giftig</option>
                    <option >Trekt bijen aan</option>
                    <option >Trekt hommels aan</option>
                    <option >Trekt vlinders aan</option>
                    <option >Trekt vogels aan</option>
              </select>
            </div>
        </form>
    </div>
    );
}
}

export default Test;
