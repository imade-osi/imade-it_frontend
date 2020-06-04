
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
      title: "Sorry, this location can't be found. Please check your city and/or state and try again!",
      icon: "error",
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
    
    //debugger 

    markersArray.length === 0  ? 

        this.setState({
          latCenter: newlat,
          lngCenter: newlong,
          mapView: true
        })

    :

    this.setState({
      latCenter: newlat,
      lngCenter: newlong,
      markersArray: markersArray,
      mapView: true 
    })

    //debugger 

  }


  getCareerCoordinates = (city, state) => {
        //debugger 
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
    let markersArray = []

    let cityArray = city.split(' ')
    let stateArray = state.split(' ')
    address = '1600+Amphitheatre+Parkway,+Mountain+View,+California';
    address2 = 'Paul Alto,+Mountain+View,+California';
    // if (cityArray.length === 3) {
    //   city = `${cityArray[0]}+${cityArray[1]}+${cityArray[2]}`
    // }
    // else if (cityArray.length === 2) {
    //   city = `${cityArray[0]}+${cityArray[1]}`
    // }
    // else if (cityArray.length === 1) {
    //   city = `${cityArray[0]}`
    // }
    // else window.alert('Sorry, the city you entered could not be found. Please try again. ')

   

    // if (stateArray.length === 3) {
    //   state = `${stateArray[0]}+${stateArray[1]}+${stateArray[2]}`
    // }
    // else if (stateArray.length === 2) {
    //   state = `${stateArray[0]}+${stateArray[1]}`
    // }
    // else if (stateArray.length === 1) {
    //   state = `${stateArray[0]}`
    // }
    // else window.alert('Sorry, the city you entered could not be found. Please try again. ')

    
    let address = `${city},+${state}`
    

    //debugger 
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_MAP_API_KEY}`, {
    })
      .then(r => r.json())
      .then((response) => {
        //debugger
        
        if (response.results[0] === undefined ) {
          this.handleSearchError()
          return
        }
        else 

         
        latCenter = response.results[0].geometry.location.lat
        longCenter = response.results[0].geometry.location.lng
        
 
        fetch(`${proxyurl}https://maps.googleapis.com/maps/api/place/textsearch/json?query=job+fairs+near+${address}&key=${process.env.REACT_APP_MAP_API_KEY}`)
          .then(r => r.json())
          .then((response) => {
           

           
              if (response.results.length > 0 )
              {
                response.results.forEach((element, idx) => {
                  if (idx < 20) {
                    markersArray.push([element.name, element.formatted_address, element.geometry.location.lat, element.geometry.location.lng])
                  }
                }) 
              }
              //debugger 
              
            this.setCenter(latCenter, longCenter, markersArray)
          })
      })
  }

  render() {
    console.log("all my careers", this.props.myCareerServices)
    debugger
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
            <ExamplesNavbar history={this.props.history}/><LandingPageHeader currentUserName={this.props.currentUserName} getCareerCoordinates={this.getCareerCoordinates}/>
          </div>
      }
      </div>
    )
  }
}


