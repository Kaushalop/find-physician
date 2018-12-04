
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { throws } from 'assert';

const Marker = ({ text }) => (
    <div style={{
      color: 'white',
      padding: '15px 10px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)'
    }}>
    <img src='http://maps.google.com/mapfiles/ms/icons/blue.png' />
    </div>
  );
  
  class SimpleMap extends Component {
    static defaultProps = {
      center: {lat: 59.95, lng: 30.33},
      zoom: 11,
      text: ''
    };
  
    render() {
      return (
         <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBsqVk57QP2WRdiSc51QK9augiLlFCxtdo' }}
          center={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Marker 
            lat={this.props.center.lat} 
            lng={this.props.center.lng}
            text={this.props.text}
          />
        </GoogleMapReact>
      );
    }
  }

  export default SimpleMap;