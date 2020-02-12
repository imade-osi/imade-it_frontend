
import React, { Component } from 'react'


// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import MapContainer from "container/MapContainer.js"
import swal from 'sweetalert'

export default class LandingPage extends Component {

  state = {
      latCenter: 0,
      lngCenter: 0,
      markersArray: [],
      mapView: false,
      defaultMarker:  "http://maps.google.com/mapfiles/ms/micons/red-dot.png" 
  }

  handleSearchError = () => {
    swal({
      title: "Sorry, please check your city and state again!",
      icon: "fail",
      button: "Back to Map",
    });
  }

  resetColors = () => {
    this.setState({
      ...this.state
    })
  }

  handleMainBtn = () => {
      this.setState({
        ...this.state, 
        mapView: false
      })
  }

  setCenter = (newlat, newlong, markersArray) => {
    this.setState({
      latCenter: newlat,
      lngCenter: newlong,
      markersArray: markersArray,
      mapView: true 
    })

  }


  getCareerCoordinates = (city, state) => {
       // debugger 
    if (!city)
    {
    city = 'philadelphia'
    state = 'pennsylvania'
    }
    // city = 'chicago'
    // state = 'illinois'

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    let latCenter = 0;
    let longCenter = 0;
    let cityArray = city.split(' ')
    let stateArray = state.split(' ')
    let markersArray = []
    // address = '1600+Amphitheatre+Parkway,+Mountain+View,+California';

    if (cityArray.length === 3) {
      city = `${cityArray[0]}+${cityArray[1]}+${cityArray[2]}`
    }
    else if (cityArray.length === 2) {
      city = `${cityArray[0]}+${cityArray[1]}`
    }
    else if (cityArray.length === 1) {
      city = `${cityArray[0]}`
    }
    else window.alert('Sorry, the city you entered could not be found. Please try again. ')


    if (stateArray.length === 3) {
      state = `${stateArray[0]}+${stateArray[1]}+${stateArray[2]}`
    }
    else if (stateArray.length === 2) {
      state = `${stateArray[0]}+${stateArray[1]}`
    }
    else if (stateArray.length === 1) {
      state = `${stateArray[0]}`
    }
    else window.alert('Sorry, the city you entered could not be found. Please try again. ')


    let address = `${city},+${state}`



    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDxHFNinALkQR6O1N-ZxPn65Kt085sUk0I`, {
    })
      .then(r => r.json())
      .then((response) => {
        if(address === undefined)
        {
          this.handleSearchError()
        }
        latCenter = response.results[0].geometry.location.lat
        longCenter = response.results[0].geometry.location.lng

        fetch(`${proxyurl}https://maps.googleapis.com/maps/api/place/textsearch/json?query=job+fairs+near+${address}&key=AIzaSyDxHFNinALkQR6O1N-ZxPn65Kt085sUk0I`)
          .then(r => r.json())
          .then((response) => {
            response.results.forEach((element, idx) => {
              if (idx < 20) {
                markersArray.push([element.name, element.formatted_address, element.geometry.location.lat, element.geometry.location.lng])
              }
            }) 
    
            this.setCenter(latCenter, longCenter, markersArray)
          })
      })
  }

  render() {
    return (
      <div>
          {this.state.mapView ? 
            <MapContainer latCenter={this.state.latCenter} lngCenter={this.state.lngCenter} 
                          markersArray={this.state.markersArray} getCareerCoordinates={this.getCareerCoordinates}
                          handleMainBtn={this.handleMainBtn} defaultMarker={this.state.defaultMarker} resetColors={this.resetColors}
                          addServiceToPage={this.props.addServiceToPage}

            />
        :
          <div> 
            <ExamplesNavbar /><LandingPageHeader getCareerCoordinates={this.getCareerCoordinates}/>
          </div>
      }
      </div>
    )
  }
}


