import React, { Component } from 'react';
import './Donate.css';
import { Form, Button, Row, Col } from 'react-bootstrap';

class Donate extends Component{

  render() {
    return (
        <div className="Donatie">
            <div class="container">
              <div class="row tr">
                <div class="col"><h1>Maak een donatie</h1></div>
                <div class="col coltr">
                  <form>
                    <div class="form-group">
                      <div class="row rowst">
                        <div class="col colst"><h2>Kies een bedrag:</h2></div>
                      </div>
                      <div class="row rowst">
                        <div class="col colst" >
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                            <label class="form-check-label" for="inlineRadio1">€ 1.00</label>
                          </div>
                        </div>
                        <div class="col colst">
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                            <label class="form-check-label" for="inlineRadio1">€ 5.00</label>
                          </div>
                        </div>
                        <div class="col colst">
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                            <label class="form-check-label" for="inlineRadio1">€ 10.00</label>
                          </div>
                        </div>
                      </div>
                      <div class="row rowst">
                        <div class="col colst">
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                            <label class="form-check-label" for="inlineRadio1"></label>
                            <input type="Bedrag" class="form-control" id="Bedrag" placeholder="Bedrag" size="50"/>  
                          </div>
                        </div>
                    </div>
                    </div>
                  </form>
                  <form>
                    <div class="form-group">
                      <div class="row rowst">
                        <div class="col colst" >
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                            <label class="form-check-label" for="inlineRadio1">Eenmalige Incasso</label>
                          </div>
                        </div>
                        <div class="col colst">
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                            <label class="form-check-label" for="inlineRadio1">Ideal</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  <form>
                    <div class="form-group">
                      <div class="row rowst">
                        <div class="col colst">
                          <div class="form-group">
                            <input type="omschrijving" class="form-control tx" id="Omschrijving" placeholder="Ten name van"/>
                          </div> 
                        </div>
                      </div>
                    </div>
                  </form>
                  <form>
                    <div class="form-group">
                      <div class="row rowst">
                        <div class="col colst">
                          <div class="form-group">
                            <input type="omschrijving" class="form-control" id="Omschrijving" placeholder="E-mail"/>
                          </div> 
                        </div>
                      </div>
                    </div>
                  </form>
                  <form>
                    <div class="form-group">
                      <div class="row rowst">
                        <div class="col colst">
                          <div class="form-group">
                            <input type="omschrijving" class="form-control" id="Omschrijving" placeholder="Geboortedatum"/>
                          </div> 
                        </div>
                        <div class="col colst">
                          <div class="form-group">
                            <input type="omschrijving" class="form-control" id="Omschrijving" placeholder="Telefoonnummer"/>
                          </div> 
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>          
        </div>

    );
}
}

export default Donate;