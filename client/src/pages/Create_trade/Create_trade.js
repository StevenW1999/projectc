import React, { Component } from 'react';
import './Create_trade.css';

class Create_trade extends Component{
    constructor(props) {
        super(props);
        this.state = {file: '',imagePreviewUrl: ''};
      }
    
      _handleSubmit(e) {
        e.preventDefault();
        console.log('handle uploading-', this.state.file);
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
    
      render() {
    
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img src={imagePreviewUrl} />);
        } 
        else {
          $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
    
        return (   
          <div className="previewComponent">       
            <div className="Title">
              <p>Title</p>
              <input type="text"  />
            </div>
            <div className="Plaats">
              <p>Plaats</p>
              <input type="text"  />
            </div>
            <div className="Omschrijving">
              <p>Omschrijving</p>
              <textarea name="textArea" rows="4" >
              </textarea>
            </div>
            <div className="Categorie">
              <p>Vaste plant</p>
              Ja: <input type = "checkbox"/>Nee: <input type = "checkbox"/>
            </div>
            <div className="Categorie">
              <p>Soort</p>
              <select value={this.state.value} >
                <option selected value> -- Kies een categorie -- </option>
                <option value="bomen">Bomen</option>
                <option value="bodem">Bodembedekkers</option>
                <option value="conifeer">Coniferen</option>
                <option value="haag">Haagplanten</option>
                <option value="struik">Heesters of struiken</option>
                <option value="klim">Klimplanten</option>
                <option value="sier">Siergrassen</option>
                <option value="terras">Terrasplanten</option>
                <option value="vijver">Vijverplanten</option>
              </select>
            </div>
            <div className="Categorie">
              <p>Standplaats</p>
              <select value={this.state.value} >
                <option selected value> -- Kies een categorie -- </option>
                <option value="schaduw">Volle schaduw</option>
                <option value="halfschaduw">Half schaduw</option>
                <option value="zon">Volle Zon</option>
              </select>
            </div>
            <div className="Categorie">
              <p>Bloeimaand</p>
              <select value={this.state.value} >
                <option selected value> -- Kies een categorie -- </option>
                <option value="jan_fbr">Januari -februari</option>
                <option value="mrt_apr">Maart - April</option>
                <option value="mei_jun">Mei - Juni</option>
                <option value="jul_aug">Juli - Augustus</option>
                <option value="sept_okt">September - Oktober</option>
                <option value="nov_dec">November - December</option>
              </select>
            </div>
            <div className="Categorie">
              <p>Bloeikleur</p>
              <select value={this.state.value} >
                <option selected value> -- Kies een categorie -- </option>
                <option value="blauw">Blauw</option>
                <option value="bruin">Bruin</option>
                <option value="geel">Geel</option>
                <option value="groen">Groen</option>
                <option value="oranje">Oranje</option>
                <option value="paars">Paars</option>
                <option value="rood">Rood</option>
                <option value="roze">Roze</option>
                <option value="wit">Wit</option>
                <option value="zwart">Zwart</option>
                <option value="meerkl">Meerkleurig</option>
                <option value="anders">anders</option>
              </select>
            </div>
            <div className="Categorie">
              <p>Groeihoogte</p>
              <select value={this.state.value} >
                <option selected value> -- Kies een categorie -- </option>
                <option value="20">0 - 20 cm</option>
                <option value="40">20 - 40 cm</option>
                <option value="70">40 - 70 cm</option>
                <option value="100">70 - 100 cm</option>
                <option value="120">100 - 120 cm</option>
                <option value="150">120 - 150 cm</option>
                <option value="2m">1.5 - 2 m</option>
                <option value="hoger">hoger dan 2 m</option>
              </select>
            </div>
            <div className="Categorie">
              <p>Speciale kenmerken</p>
              <select value={this.state.value} >
                <option selected value> -- Kies een categorie -- </option>
                <option value="aroma">Aromatisch</option>
                <option value="bijen">Bijen aantrekken</option>
                <option value="droogbl">Droogbloem</option>
                <option value="fruit">Fruit</option>
                <option value="geur">Geurende bloem</option>
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
          </div>
        )
      }
    }
    

export default Create_trade;