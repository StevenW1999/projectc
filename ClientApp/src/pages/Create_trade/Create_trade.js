import React, { Component } from 'react';
import './Create_trade.css';
import { Form, Button, Row, Col } from 'react-bootstrap';
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import Image from 'react-bootstrap/Image';

const fileTypes = [
    "image/jpg",
    "image/jpeg",
    "image/png"
];

function validFileType(file) {
    return fileTypes.includes(file.type);
}

class Create_trade extends Component{
    constructor(props) {
        super(props);
        this.state = {
            Image: null,
            Name: "",
            Description: "",
            Category: "",
            Available: true,
            Type: "",
            Perennial: "",
            Shadow: "",
            AmountOfWater: "",
            Soil: "",
            GrowthHeigth: "",
            Color: "",
            SeasonFrom: Date,
            SeasonTo: Date,
            SpecialFeatures: "",
            token: "",
            isAuthenticated: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    _handleReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result
        this.setState({
            file: btoa(binaryString)
        })
    }

    handleImage = (e) => {
        e.preventDefault();

        let file = e.target.files[0];
        let reader = new FileReader();

        if (e.target.files.length === 0) {
            return;
        }
        else {
            if (validFileType(file)) {
                reader.onloadend = (e) => {
                    let binaryString = e.target.result
                    this.setState({
                        Image: btoa(binaryString)
                    });
                }

                reader.readAsBinaryString(file)
            }
            else {
                alert("Bestand is ongeldig! Alleen foto's zijn toegestaan.")
            }
        }
    }


    handleInputChange(event) {
        event.stopPropagation()
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        
    }


    onSubmitHandler = (e) => {
        e.preventDefault();
        fetch('/api/Plants', {
            method: 'post', 
            headers: {
                'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('bearer')
            },
            body: JSON.stringify({
                "Image": this.state.Image,
                "Name": this.state.Name,
                "Description": this.state.Description,
                "Category": this.state.Category,
                "Available": this.state.Available,
                "Type": this.state.Type,
                "Perennial": this.state.Perennial,
                "Shadow": this.state.Shadow,
                "AmountOfWater": this.state.AmountOfWater,
                "Soil": this.state.Soil,
                "GrowthHeigth": this.state.GrowthHeigth,
                "Color": this.state.Color,
                "SeasonFrom": this.state.SeasonFrom,
                "SeasonTo": this.state.SeasonTo,
                "SpecialFeatures": this.state.SpecialFeatures
            })
        })
            .then(response => {
                const data = response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    if (response.status === 401) {
                        alert('gegevens onjuist, probeer het opnieuw!')
                    }
                    return Promise.reject(error);
                }
                //console.log('Plant aangemaakt')
                alert('Plant aangemaakt');
                this.props.history.push('/');
            })
        //.catch(error => { console.error('error: ', error) })
    }

render () {

  return (
      <div className="Create">
          <h1>Maak een plantenruil aan</h1>
          <Form>
              <Form.Group controlId="TitleInput">
                  <Form.Label>Titel</Form.Label>
                  <Form.Control type="Title" name="Name" placeholder="Titel" onChange={this.handleInputChange} />
              </Form.Group>
              <Form.Group controlId="omschInput">
                  <Form.Label>Omschrijving</Form.Label>
                  <Form.Control as="textarea" rows={3} maxlength="500" name="Description" type="Description" placeholder="Omschrijving" onChange={this.handleInputChange} />
              </Form.Group>
              <Form.Group controlId="omschInput">
                  <Form.Label>Categorie</Form.Label>
                  <Form.Control as="select" name="Category" onChange={this.handleInputChange}>
                      <option> -- Kies een categorie -- </option>
                      <option >Zaadjes</option>
                      <option >Zaailing</option>
                      <option >Stekje</option>
                      <option >Plant</option>
                  </Form.Control>
              </Form.Group>
              <fieldset>
                  <Form.Group as={Row}>
                      <Form.Label as="legend" column sm={2}>
                          Vaste plant?
                      </Form.Label>
                    <Col sm={10}>
                    <Form.Check
                        type="radio"
                        label="Ja"
                        name="Perennial"
                        onChange={this.handleInputChange}
                    />
                    <Form.Check
                        type="radio"
                        label="Nee"
                        name="Perennial"
                        onChange={this.handleInputChange}
                    />
                    </Col>
                  </Form.Group>
              </fieldset>
              <Form.Group controlId="TypeInput">
                  <Form.Label>Soort</Form.Label>
                  <Form.Control as="select" name="Type" onChange={this.handleInputChange}>
                      <option> -- Kies een categorie -- </option>
                      <option>Bomen</option>
                      <option>Struiken</option>
                      <option>Kruidachtige</option>
                      <option>Bodemdekkers</option>
                      <option>Klimplanten</option>
                      <option>Vijverplanten</option>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="Shadowinput">
                  <Form.Label>Standplaats</Form.Label>
                  <Form.Control as="select" name="Shadow" onChange={this.handleInputChange}>
                      <option> -- Kies een categorie -- </option>
                      <option >Zon</option>
                      <option >Half schaduw</option>
                      <option >Schaduw</option>
                      <option >Stelt geen eisen</option>
                      <option >Geen idee</option>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="waterinput">
                  <Form.Label>Water</Form.Label>
                  <Form.Control as="select" name="AmountOfWater" onChange={this.handleInputChange}>
                      <option> -- Kies een categorie -- </option>
                      <option >Nat</option>
                      <option >Gemiddeld</option>
                      <option >Droog</option>
                      <option >Stelt geen eisen</option>
                      <option >Geen idee</option>
                  </Form.Control>
              </Form.Group>
              <fieldset>
                  <Form.Group as={Row}>
                      <Form.Label as="legend" column sm={2}>
                          Grond stelt eisen:
                      </Form.Label>
                      <Col sm={10}>
                          <Form.Check
                              type="radio"
                              label="Ja"
                              name="Soil"
                              onChange={this.handleInputChange}
                          />
                          <Form.Check
                              type="radio"
                              label="Nee"
                              name="Soil"
                              onChange={this.handleInputChange}
                          />
                      </Col>
                  </Form.Group>
              </fieldset>
              <Form.Group controlId="HeightInput">
                  <Form.Label>Groeihoogte</Form.Label>
                  <Form.Control as="select" name="GrowthHeigth" onChange={this.handleInputChange}>
                      <option> -- Kies een categorie -- </option>
                      <option >0 - 20 cm</option>
                      <option >20 - 40 cm</option>
                      <option >40 - 70 cm</option>
                      <option >70 - 100 cm</option>
                      <option >100 - 120 cm</option>
                      <option >120 - 150 cm</option>
                      <option >1.5 - 2 m</option>
                      <option >hoger dan 2 m</option>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="ColorInput">
                  <Form.Label>Bloeikleur</Form.Label>
                  <Form.Control as="select" name="Color" onChange={this.handleInputChange}>
                      <option> -- Kies een categorie -- </option>
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
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="SeasonFromInput">
                  <Form.Label>Bloeimaand van:</Form.Label>
                  <Form.Control as="select" name="SeasonFrom" onChange={this.handleInputChange}>
                      <option> -- Kies een categorie -- </option>
                      <option value="2020-01-01">Januari</option>
                      <option value="2020-02-01">Februari</option>
                      <option value="2020-03-01">Maart</option>
                      <option value="2020-04-01">April</option>
                      <option value="2020-05-01">Mei</option>
                      <option value="2020-06-01">Juni</option>
                      <option value="2020-07-01">Juli</option>
                      <option value="2020-08-01">Augustus</option>
                      <option value="2020-09-01">September</option>
                      <option value="2020-10-01">Oktober</option>
                      <option value="2020-11-01">November</option>
                      <option value="2020-12-01">December</option>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="SeasonToInput">
                  <Form.Label>Bloeimaand tot:</Form.Label>
                  <Form.Control as="select" name="SeasonTo" onChange={this.handleInputChange}>
                      <option> -- Kies een categorie -- </option>
                      <option value="2020-01-01">Januari</option>
                      <option value="2020-02-01">Februari</option>
                      <option value="2020-03-01">Maart</option>
                      <option value="2020-04-01">April</option>
                      <option value="2020-05-01">Mei</option>
                      <option value="2020-06-01">Juni</option>
                      <option value="2020-07-01">Juli</option>
                      <option value="2020-08-01">Augustus</option>
                      <option value="2020-09-01">September</option>
                      <option value="2020-10-01">Oktober</option>
                      <option value="2020-11-01">November</option>
                      <option value="2020-12-01">December</option>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="SpecialFeaturesInput">
                  <Form.Label>Extra eigenschappen</Form.Label>
                  <DropdownMultiselect
                      options={["Geurend", "Eetbaar", "Giftig", "Trekt bijen aan", "Trekt hommels aan", "Trekt vlinders aan", "Trekt vogels aan"]}
                      name="SpecialFeatures" onChange={this.handleInputChange} />
              </Form.Group>
              <Form.Group controlId="ImageInput">
                  <Form.Label>Voeg een afbeelding toe</Form.Label><br></br>
                  <input type="file" name="Image" accept='image/jpeg, image/png, image/jpg' onChange={this.handleImage} />
                  <p>Voorbeeld afbeelding:</p>
                  <Image className="Previmage" src={"data:file/png;base64," + this.state.Image} />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={this.onSubmitHandler}>
                  Plant aanmaken
              </Button>   
          </Form> 

    </div>
    );
}
}

export default Create_trade;
