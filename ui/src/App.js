import React, { Component } from 'react';
import './App.css';
import SimpleMap from './SimpleMap.js';
import MapsRedirect from './MapsRedirect.js';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'bootstrap/dist/css/bootstrap.min.css';

const apiUrl = 'https://find-physician.herokuapp.com';

class App extends Component {

  constructor() {
    super();
    this.state = {
      selectedPhysician: '',
      currentAddress: '',
      currentLocation: {},
      options: [],
      multiple: false
    };
    this.fetchOptions();
    this.fetchLatLng = this.fetchLatLng.bind(this);
    this.logit = this.logit.bind(this);
    
  }

  fetchOptions = () => {
    fetch(apiUrl+'/physicians', {
      headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    .then(results => {
      return results.json();
    }).then(data => {
      let options = data.map((physician) => {
        return {
          id : physician.id,
          name : physician.name,
          address : physician.address
        };
      });
      this.setState({
        options: options
      });
    })
  }

  fetchLatLng = (address, name) => {
    //given the address, get the lat lng for the person
    const API_KEY = 'AIzaSyBsqVk57QP2WRdiSc51QK9augiLlFCxtdo';
    let url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key='+API_KEY;
    fetch(url, {
      headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    .then(results => {
      return results.json();
    }).then(data => {
      console.log(data.results[0])
      this.setState({
        selectedPhysician: name,
        currentAddress: data.results[0],
        currentLocation: data.results[0].geometry.location
      });
    })
  }

  logit = (value) => {
    console.log(value)
    if(value.length > 0) {
      this.fetchLatLng(value[0].address, value[0].name)
    }
  }
  changeLog = (text) => {
    console.log(text)
    this.setState({
      selectedPhysician: ''
    });
  }

  render() {

    const {multiple} = this.state;
    return (
      <div className="App">
        <Typeahead
              labelKey={option => `${option.name}`}
              options={this.state.options}
              filterBy={['name']}
              multiple={multiple}
              onInputChange={this.changeLog}
              onChange={this.logit}
              placeholder="Physician Name"
            />
            <div style={{width: '100%', height: '400px'}}>
            {this.state.currentAddress !== ''? 
              <SimpleMap
                center={this.state.currentLocation}
                text={this.state.currentAddress}
                  />
               
              : <div></div>}
              {this.state.currentAddress !== ''? 
              
           <MapsRedirect
           text={this.state.currentAddress}
           />
              : <div></div>}
            </div>
            
      </div>
    );
  }
}

export default App;
