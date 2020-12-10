import React, { Component } from 'react';
import './Editplant.css';
import { Form, Button, Row, Col } from 'react-bootstrap';

class Editplant extends Component{
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            Image: "",
            Name: "Viool",
            Description: "Mooie plant, doet het goed",
            Available: true,
            Type: "Kruidachtige",
            Perennial: "on",
            Shadow: "Zon",
            AmountOfWater: "Gemiddeld",
            Soil: "off",
            GrowthHeigth: "0 - 20 cm",
            Color: "Blauw",
            SeasonFrom: "2020-12-11",
            SeasonTo: "2020-12-11",
            SpecialFeatures: "Eetbaar",
            token: "",
            isAuthenticated: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    handleInputChange(event) {
        event.preventDefault();
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
                'Content-Type': 'application/json', 'Authorization': 'Bearer ' +
                    ''     },
            body: JSON.stringify({
                "Name": this.state.Name,
                "Description": this.state.Description,
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
                console.log('Plant aangemaakt')
            })
        //.catch(error => { console.error('error: ', error) })
    }


    render() {
        var isvast = false;
        var isnietvast = false;
    if (this.state.Perennial == "on") {
        isvast = true;
    }
    else {
        isnietvast = true;
    }
        var grondja = false;
        var grondnee = false;
        if (this.state.Soil == "on") {
            grondja = true;
        }
        else {
            grondnee = true;
        }



  return (
      <div className="Create">
          <h1>Maak een plantenruil aan</h1>
          <Form>
              <Form.Group controlId="TitleInput">
                  <Form.Label>Titel</Form.Label>
                  <Form.Control type="Title" name="Name" placeholder="Titel" onChange={this.handleInputChange} value={this.state.Name} />
              </Form.Group>
              <Form.Group controlId="omschInput">
                  <Form.Label>Omschrijving</Form.Label>
                  <Form.Control as="textarea" rows={3} name="Description" type="Description" placeholder="Omschrijving" onChange={this.handleInputChange} value={this.state.Description} />
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
                        checked = {isvast}
                        onChange={this.handleInputChange}
                    />
                    <Form.Check
                        type="radio"
                        label="Nee"
                        name="Perennial"
                        checked = {isnietvast}
                        onChange={this.handleInputChange}
                    />
                    </Col>
                  </Form.Group>
              </fieldset>
              <Form.Group controlId="TypeInput">
                  <Form.Label>Soort</Form.Label>
                  <Form.Control as="select" name="Type" value={this.state.Type} onChange={this.handleInputChange}>
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
                  <Form.Control as="select" name="Shadow" value={this.state.Shadow} onChange={this.handleInputChange}>
                      <option> -- Kies een categorie -- </option>
                      <option >Zon</option>
                      <option >Half schaduw</option>
                      <option >Schaduw</option>
                      <option >Stelt geen eisen</option>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="waterinput">
                  <Form.Label>Water</Form.Label>
                  <Form.Control as="select" name="AmountOfWater" value={this.state.AmountOfWater} onChange={this.handleInputChange}>
                      <option> -- Kies een categorie -- </option>
                      <option >Nat</option>
                      <option >Gemiddeld</option>
                      <option >Droog</option>
                      <option >Stelt geen eisen</option>
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
                              checked={grondja}
                              value={this.state.Soil}
                              onChange={this.handleInputChange}
                          />
                          <Form.Check
                              type="radio"
                              label="Nee"
                              name="Soil"
                              checked={grondnee}
                              value={this.state.Soil}
                              onChange={this.handleInputChange}
                          />
                      </Col>
                  </Form.Group>
              </fieldset>
              <Form.Group controlId="HeightInput">
                  <Form.Label>Groeihoogte</Form.Label>
                  <Form.Control as="select" name="GrowthHeigth" value={this.state.GrowthHeigth} onChange={this.handleInputChange}>
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
                  <Form.Control as="select" name="Color" value={this.state.Color} onChange={this.handleInputChange}>
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
                  <Form.Control type="date" name="SeasonFrom" placeholder="mm/dd/jj" onChange={this.handleInputChange} value={this.state.SeasonFrom} />
              </Form.Group>
              <Form.Group controlId="SeasonToInput">
                  <Form.Label>Bloeimaand tot:</Form.Label>
                  <Form.Control type="date" name="SeasonTo" placeholder="mm/dd/jj" onChange={this.handleInputChange} value={this.state.SeasonTo} />
              </Form.Group>
              <Form.Group controlId="SpecialFeaturesInput">
                  <Form.Label>Extra eigenschappen</Form.Label>
                  <Form.Control as="select" name="SpecialFeatures" value={this.state.SpecialFeatures} onChange={this.handleInputChange}>
                      <option> -- Kies een categorie -- </option>
                      <option >Geurend</option>
                      <option >Eetbaar</option>
                      <option >Giftig</option>
                      <option >Trekt bijen aan</option>
                      <option >Trekt hommels aan</option>
                      <option >Trekt vlinders aan</option>
                      <option >Trekt vogels aan</option>
                  </Form.Control>
              </Form.Group>
                <Form.Group>
                    <Form.File id="exampleFormControlFile1" label="Example file input" />
                </Form.Group>
              <Button variant="primary" type="submit" onClick={this.onSubmitHandler}>
                  Pas aan
              </Button>   
          </Form> 
          


    </div>
    );
}
}

export default Editplant;