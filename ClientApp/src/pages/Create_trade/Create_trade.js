import React, { Component } from 'react';
import './Create_trade.css';

class Create_trade extends Component{
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            Image: "",
            Name: "",
            Description: "",
            Available: "",
            Type: "",
            Perennial: "",
            Shadow: "",
            AmountOfWater: "",
            Soil: "",
            GrowthHeigth: "",
            Color: "",
            SeasonFrom: "",
            SeasonTo: "",
            SpecialFeatures: "",
        };
    }

    handleChange = event => {

        this.setState({ [event.target.name]: event.target.value })

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

    componentDidMount() {
        // POST request using fetch with set headers
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer my-token',
                'My-Custom-Header': 'foobar'
            },
            body: JSON.stringify({ title: 'React POST Request Example' })
        };
        fetch('https://jsonplaceholder.typicode.com/posts', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({
                Name: this.state.Name, Description: this.state.Description, Available: this.state.Available, Type: this.state.Type,
                Perennial: this.state.Perennial, Shadow: this.state.Shadow, AmountOfWater: this.state.AmountOfWater, Soil: this.state.Soil,
                GrowthHeigth: this.state.GrowthHeigth, Color: this.state.Color, SeasonFrom: this.state.SeasonFrom, SeasonTo: this.state.SeasonTo,
                SpecialFeatures: this.state.SpecialFeatures
            }));
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
                  <input type="title" class="form-control" id="Title" placeholder="Title" name="Name" onChange={this.handleInputChange} />
            </div>                                  
            <div class="form-group">
                <label for="Omschrijving">Omschrijving</label>
                  <input type="omschrijving" class="form-control" id="Omschrijving" placeholder="Omschrijving" name="Description" onChange={this.handleInputChange} />
            </div> 
            <div>Vaste plant</div>
            <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" name="Perennial" onChange={this.handleInputChange} />
                <label class="form-check-label" for="inlineRadio1">Ja</label>
            </div>
            <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" name="Perennial" onChange={this.handleInputChange} />
                    <label class="form-check-label" for="inlineRadio2">Nee</label>
            </div>
            <div class="form-group">
                <label for="inputsoort">Soort</label>
                  <select class="form-control" name="Type" onChange={this.handleInputChange} >
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
                  <select class="form-control" name="Shadow" onChange={this.handleInputChange} >
                    <option selected value> -- Kies een categorie -- </option>
                    <option >Zon</option>
                    <option >Half schaduw</option>
                    <option >Schaduw</option>
                    <option >Stelt geen eisen</option>
                </select>
            </div>
            <div class="form-group">
                <label for="inputwater">Water</label>
                  <select class="form-control" name="AmountOfWater" onChange={this.handleInputChange} >
                    <option selected value> -- Kies een categorie -- </option>
                    <option >Nat</option>
                    <option >Gemiddeld</option>
                    <option >Droog</option>
                    <option >Stelt geen eisen</option>
              </select>
            </div>
            <div>Grond stelt eisen:</div>
            <div class="form-check form-check-inline" >
                <input class="form-check-input" type="radio" name="Soil" id="inlineRadio1" value="option1"/>
                <label class="form-check-label" for="inlineRadio1">Ja:</label><input type="eisen" class="form-control" id="Eisen" placeholder="Eisen"/>
            </div>
            <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="Soil" id="inlineRadio2" value="option2"/>
                    <label class="form-check-label" for="inlineRadio2">Nee </label> 
            </div>
            <div class="form-group">
                  <label for="inputgroei">Groeihoogte</label>
                  <select class="form-control" name="GrowthHeigth" onChange={this.handleInputChange} >
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
                  <select class="form-control" name="Color" onChange={this.handleInputChange} >
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
                <select class="form-control" name="SeasonFrom" onChange={this.handleInputChange} >
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
                  <select class="form-control" name="SeasonTo" onChange={this.handleInputChange} >
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
                  <select class="form-control" name="SpecialFeatures" onChange={this.handleInputChange} >
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
