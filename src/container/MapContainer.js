import { Map, InfoWindow, Marker, GoogleApiWrapper, Listing } from 'google-maps-react';
import React, {Component} from 'react';
import Geocode from 'react-geocode';
import "../assets/css/MapContainer.css";
import "../assets/css/style.css";
import CareerItem from "./CareerItem.js";
import { useGoogleMap } from '@react-google-maps/api';
import {NavLink} from "reactstrap";


export class MapContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            latCenter: this.props.lat,
            lngCenter: this.props.long,
            careerDetails: {},
            infoShow: false,
            activeMarker: {},
            markerColor: this.props.defaultMarker, 
            green: true
        }
    }

    componentDidUpdate(prevProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
            
        if (this.props.markersArray.length > 0)
        {

            if (prevProps.latCenter !== this.props.latCenter )  
            {    
                this.setState({
                        ...this.state,
                        careerDetails: {
                            name: this.props.markersArray[0][0],
                            address: this.props.markersArray[0][1],
                            lat: this.props.markersArray[0][2],
                            long: this.props.markersArray[0][3]
                        }
                })
            }
        }
        else 
            this.setState({
                ...this.state,
                careerDetails: {
                    name: "Not Available",
                    address: "Not Available",
                    lat: "Not Available",
                    long: "Not Available"
                }
            })
        

        
        // if (this.props.defaultMarker === "http://maps.google.com/mapfiles/ms/micons/red-dot.png")
        // {
        //     this.setState({
        //         ...this.state,
        //         markerColor: "http://maps.google.com/mapfiles/ms/micons/red-dot.png"
        //     })
        // }

        
    }
    
    componentDidMount(){
        if (this.props.markersArray.length > 0) {
            this.setState({
                    ...this.state,
                    careerDetails: {
                    name: this.props.markersArray[0][0],
                    address: this.props.markersArray[0][1],
                    lat: this.props.markersArray[0][2],
                    long: this.props.markersArray[0][3]
                }
            })
        } else {
            this.setState({
                    ...this.state,
                    careerDetails: {
                    name: "Not Available",
                    address: "Not Available",
                    lat: "Not Available",
                    long: "Not Available"
                }
            })
                
        }

        //debugger 
    }

    setCareerCard = (careerArray) => {

        this.setState({
                ...this.state,
                careerDetails: {
                name: careerArray[0],
                address: careerArray[1],
                lat: careerArray[2],
                long: careerArray[3]
            } 
        })
    }

    handleColorChange = () =>{
        this.props.resetColors()
        // this.setState({
        //     ...this.state,
        //     markerColor: "http://maps.google.com/mapfiles/ms/micons/green-dot.png"
        // })
    }

  
    displayMarkers = () => {
        //debugger 
        return this.props.markersArray.map((markerProps, index) => {
            //debugger 
            //console.log(markerProps)
            // if(index === 1)
            // {
            //     return  <Marker key={index} id={index} position={{
            //                         lat: markerProps[2],
            //                         lng: markerProps[3]    
            //                     }}
            //                     icon={{
            //                         url: "http://maps.google.com/mapfiles/ms/micons/green-dot.png" 
            //                     }}
            //                 onClick={() => { this.setCareerCard(markerProps)}}
            //             />
            // }
            // else 
                return <Marker key={index} id={index} position={{
                    lat: markerProps[2],
                    lng: markerProps[3]
                }}
                    icon={{
                        url: this.props.defaultMarker
                    }}
                    onClick={() => { this.setCareerCard(markerProps); this.handleColorChange() }}
                /> 
        })
    }

    displayMap = () => {
        return <Map google={this.props.google}
                    //ref={(map) => map && map.panTo({ lat: this.props.latCenter, lng: this.props.lngCenter })} 
                    initialCenter={{
                        lat: this.props.latCenter,
                        lng: this.props.lngCenter
                    }}

                    center={{
                        lat: this.props.latCenter,
                        lng: this.props.lngCenter
                    }}

                    zoom={10}
                    onClick={this.onMapClicked}
                >
                    {this.displayMarkers()}
                    
                    {/* <InfoWindow 
                        marker={this.state.activeMarker}
                        visible={this.state.infoShow}
                    >
                        <h4>area</h4>
                    </InfoWindow> */}
                </Map>
    }

    searchHandler = (event) => {
        event.preventDefault()
        
        //debugger 
        let city = event.target.city.value
        let state = event.target.state.value
    
        this.props.getCareerCoordinates(city, state)
    }

    render() {
        return (
            <div> 
                <section >

                    {/* <--Section Heading--> */}

                    <div className="card">
                        <div className="card-body" style={{"padding": "40px"}}>

                            {/*  <--Google map--> */}
                            <div id="map-container-google-12" className="z-depth-1-half map-container-7">
                                 <div className="iframe" frameBorder="0" style={{"border": "0"}}>
                                    {this.displayMap()}
                                    
                                 </div>
                            </div>

                            <br /> 
                            <div className="row">

                                {/* <--Grid column--> */}
                                <div className="col-md-6 mb-4">
                                    <form onSubmit={(event)=>{this.searchHandler(event)}}>
                                        <div style={{"textAlign": "center"}}>
                                            <b>
                                                Career Service Search Field
                                            </b> 
                                        </div>

                                            <div className="md-form">
                                                <label>City</label>
                                                <input type="text" name="city" className="form-control"/>     
                                            </div>

                                            <div className="md-form">
                                                <label>State</label>
                                                <input type="text" name="state" className="form-control"/>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="text-center">
                                                <center><button type="submit" style={{ "top": "20px", "left": "40%"}} className="search-button">Search</button></center>
                                                </div>
                                            </div> 
                                        </form>
                                    </div>

                                            {/* <--Grid column--> */}
                                            <div className="col-md-6 mb-4">
                                    <CareerItem careerDetails={this.state.careerDetails} addServiceToPage={this.props.addServiceToPage}/>
                                            </div>
                                            {/* <--Grid column--> */}
                                
                                    <center><button onClick={()=>{this.props.handleMainBtn()}} className="search-button main-btn">Main Menu</button></center>
                            </div>
                        </div>
                    </div>    
                </section>  
            </div>         
        )
    }
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_MAP_API_KEY)
})(MapContainer)

