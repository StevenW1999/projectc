import React, { Component } from 'react';
import './Create_trade.css';
import { Form, Button, Row, Col } from 'react-bootstrap';

class Create_trade extends Component{
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            Image: "",
            Name: "",
            Description: "",
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

    handleInputChange(event) {
        event.preventDefault();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        console.log("state",this.state.Name)
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        fetch('/api/Plants', {
            method: 'post', 
            headers: {
                'Content-Type': 'application/json', 'Authorization': 'Bearer ' +
                    'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSm95IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVXNlciIsImV4cCI6MTYwNzUzMzU3OSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMSIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDEifQ.NwyRG9Rh0E5ZdVHtk2XDtFPVVhZ4kyi1g4H82aWNT7Y'
            },
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
                  <Form.Control as="textarea" rows={3} name="Description" type="Description" placeholder="Omschrijving" onChange={this.handleInputChange} />
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
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="SeasonToInput">
                  <Form.Label>Bloeimaand tot:</Form.Label>
                  <Form.Control as="select" name="SeasonTo" onChange={this.handleInputChange}>
                      <option> -- Kies een categorie -- </option>
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
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="SpecialFeaturesInput">
                  <Form.Label>Extra eigenschappen</Form.Label>
                  <Form.Control as="select" name="SpecialFeatures" onChange={this.handleInputChange}>
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
                  Plant aanmaken
              </Button>   
          </Form> 

    </div>
    );
}
}

export default Create_trade;
