import React, { Component } from 'react';
import './Editplant.css';
import { Form, Button, Row, Col } from 'react-bootstrap';
import dateFormat from 'dateformat';
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import Image from 'react-bootstrap/Image';

class Editplant extends Component{
    constructor(props) {
        super(props);
        this.state = {
            Plant: {
                file: '',
                imagePreviewUrl: '',
                Id: "",
                UserId: "",
                Image: null,
                Name: "",
                Description: "",
                Category: "",
                Available: false,
                Type: "",
                Perennial: "",
                Shadow: "",
                AmountOfWater: "",
                Soil: "",
                GrowthHeigth: "",
                Color: "",
                SeasonFrom: null,
                SeasonTo: null,
                SpecialFeatures: "",
                Timestamp: null,
                token: "",
                isAuthenticated: false
            }
            
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

        reader.onloadend = (e) => {
            let binaryString = e.target.result
            this.setState({ Plant: { ...this.state.Plant, image: btoa(binaryString) } });
        }

        reader.readAsBinaryString(file)
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
        fetch('/api/plants/' + this.props.location.state.id, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + sessionStorage.getItem('bearer')
            },
            body: JSON.stringify({
                'id': this.state.Plant.id,
                'userid': this.state.Plant.userId,
                'image': this.state.Plant.image,
                'name': this.state.Name ? this.state.Name : this.state.Plant.name,
                'description': this.state.Description ? this.state.Description : this.state.Plant.description,
                'available': true,
                'type': this.state.Type ? this.state.Type : this.state.Plant.type,
                'perennial': this.state.Perennial,
                'shadow': this.state.Shadow ? this.state.Shadow : this.state.Plant.shadow,
                'amountofwater': this.state.AmountOfWater ? this.state.AmountOfWater : this.state.Plant.amountOfWater,
                'soil': this.state.Soil,
                'growthheigth': this.state.GrowthHeigth ? this.state.GrowthHeigth : this.state.Plant.growthHeigth,
                'color': this.state.Color ? this.state.Color : this.state.Plant.color,
                'seasonfrom': this.state.SeasonFrom ? this.state.SeasonFrom : this.state.Plant.seasonFrom,
                'seasonto': this.state.SeasonTo ? this.state.SeasonTo : this.state.Plant.seasonTo,
                'specialfeature': this.state.SpecialFeatures ? this.state.SpecialFeatures : this.state.Plant.specialFeatures,
                'timestamp': this.state.Timestamp ? this.state.Timestamp : this.state.Plant.timestamp,
                'category': this.state.Category ? this.state.Category : this.state.Plant.category,
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
                //console.log('Plant gewijzigd')
            })
        alert('Plant gewijzigd');
        //this.props.history.push('/');
        //.catch(error => { console.error('error: ', error) })
        window.location.href = "/";
    }

    componentDidMount() {
        fetch('/api/plants/' + this.props.location.state.id, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + sessionStorage.getItem('bearer')
            }
        })
            .then(response => { return response.json(); })
            .then(data => {
                this.setState({ "Plant": data });
            })
            .catch(err => {
                console.log("fetch error" + err);
            });
    }


    render() {
        //var isvast = false;
        //var isnietvast = false;
    if (this.state.Plant.perennial == "on") {
        var isvast = true;
    }
    else {
        var isnietvast = true;
    }
        //var grondja = false;
        //var grondnee = false;

    if (this.state.Plant.soil == "on") {
        var grondja = true;
    }
    else {
        var grondnee = true;
    }

  return (
      <div className="Create">
          <h1>Maak een plantenruil aan</h1>
          <Form>
              <Form.Group controlId="TitleInput">
                  <Form.Label>Titel</Form.Label>
                  <Form.Control type="Title" name="Name" placeholder="Titel" onChange={this.handleInputChange} defaultValue={this.state.Plant.name} />
              </Form.Group>
              <Form.Group controlId="omschInput">
                  <Form.Label>Omschrijving</Form.Label>
                  <Form.Control as="textarea" rows={3} name="Description" type="Description" placeholder="Omschrijving" onChange={this.handleInputChange} defaultValue={this.state.Plant.description} />
              </Form.Group>
              <Form.Group controlId="omschInput">
                  <Form.Label>Categorie</Form.Label>
                  <Form.Control as="select" name="Category" defaultValue={this.state.Plant.Category} onChange={this.handleInputChange}>
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
                        defaultChecked = {isvast}
                        onChange={this.handleInputChange}
                    />
                    <Form.Check
                        type="radio"
                        label="Nee"
                        name="Perennial"
                        defaultChecked = {isnietvast}
                        onChange={this.handleInputChange}
                    />
                    </Col>
                  </Form.Group>
              </fieldset>
              <Form.Group controlId="TypeInput">
                  <Form.Label>Soort</Form.Label>
                  <Form.Control as="select" name="Type" defaultValue={this.state.Plant.type} onChange={this.handleInputChange}>
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
                  <Form.Control as="select" name="Shadow" defaultValue={this.state.Plant.shadow} onChange={this.handleInputChange}>
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
                  <Form.Control as="select" name="AmountOfWater" defaultValue={this.state.Plant.amountOfWater} onChange={this.handleInputChange}>
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
                              defaultChecked={grondja}
                              defaultValue={this.state.Soil}
                              onChange={this.handleInputChange}
                          />
                          <Form.Check
                              type="radio"
                              label="Nee"
                              name="Soil"
                              defaultChecked={grondnee}
                              defaultValue={this.state.Soil}
                              onChange={this.handleInputChange}
                          />
                      </Col>
                  </Form.Group>
              </fieldset>
              <Form.Group controlId="HeightInput">
                  <Form.Label>Groeihoogte</Form.Label>
                  <Form.Control as="select" name="GrowthHeigth" defaultValue={this.state.Plant.growthHeigth} onChange={this.handleInputChange}>
                      <option> -- Kies een categorie -- </option>
                      <option defaultValue="0 - 20 cm">0 - 20 cm</option>
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
                  <Form.Control as="select" name="SeasonFrom" defaultValue={dateFormat(this.state.Plant.seasonTo, "yyyy-mm-dd")} onChange={this.handleInputChange}>
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
                  <Form.Control as="select" name="SeasonTo" defaultValue={dateFormat(this.state.Plant.seasonTo, "yyyy-mm-dd")} onChange={this.handleInputChange}>
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
                      name="SpecialFeatures" defaultValue={this.state.Plant.specialFeatures} onChange={this.handleInputChange} />
              </Form.Group>
              <Form.Group controlId="ImageInput">
                  <Form.Label>Voeg een afbeelding toe</Form.Label><br></br>
                  <input type="file" name="Image" onChange={this.handleImage} />
                  <p>Voorbeeld afbeelding:</p>
                  <Image className="Previmage" src={"data:file/png;base64," + this.state.Plant.image} />
              </Form.Group>
              <Button variant="primary" onClick={this.onSubmitHandler}>
                  Pas aan
              </Button>   
          </Form> 


    </div>
    );
}
}

export default Editplant;
