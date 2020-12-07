import React, { Component } from 'react';
import './Create_trade.css';

class Create_trade extends Component{
    constructor(props) {
        super(props);
        this.state = {file: '',imagePreviewUrl: ''};
      }
    
      _handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
      }
render () {
    let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img src={imagePreviewUrl} />);
        } 
        else {
          $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
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
            <div>Vaste plant</div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                <label class="form-check-label" for="inlineRadio1">Ja</label>
            </div>
            <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
                    <label class="form-check-label" for="inlineRadio2">Nee</label>
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
            <div>Grond stelt eisen:</div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                <label class="form-check-label" for="inlineRadio1">Ja:</label><input type="eisen" class="form-control" id="Eisen" placeholder="Eisen"/>
            </div>
            <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
                    <label class="form-check-label" for="inlineRadio2">Nee </label> 
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
            <div className="fileInput">
              <input type="file" 
                onChange={(e)=>this._handleImageChange(e)} />
            </div>
            <div className="fileInput">
              <input type="file" 
                onChange={(e)=>this._handleImageChange(e)} />
            </div>
            <div className="fileInput">
              <input type="file" 
                onChange={(e)=>this._handleImageChange(e)} />
            </div>
            <div className="imgPreview">
              {$imagePreview}
            </div>
        </form>
        <button class="btn btn-primary" type="submit">Voeg toe</button>
        <br></br>
    </div>
    );
}
}

export default Create_trade;
