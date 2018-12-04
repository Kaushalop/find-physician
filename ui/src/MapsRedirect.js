
import React, { Component } from 'react';

class MapsRedirect extends Component {

    static defaultProps = {
        text: {}
    }

    render() {
      let url = "https://www.google.com/maps/place/"+ encodeURIComponent(this.props.text.formatted_address);
      return (
      <a href={url} target="_blank" rel="noopener noreferrer">{this.props.text.formatted_address}</a>
      );
    }
  }

  export default MapsRedirect;