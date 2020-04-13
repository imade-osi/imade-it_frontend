
import React from 'react' 
import {Modal, Card, Image, Header} from 'semantic-ui-react'
import swal from 'sweetalert'

export default class CareerItem extends React.Component {

    state = {
        addedToLog: false,
        
    }

    addCareer = () => {
        swal({
            title: "New Career Service added to your page!",
            text: this.props.careerDetails.name,
            icon: "success",
            button: "Back to Map",
        });
    }

    handleClick = () => {
        // this.setState({
        //     purchased: true
        // })

        // if (this.props.addItemToCart) {
        //     this.props.addItemToCart(this.props.item)
        // }
    }





    render() {
        const { open, dimmer } = this.state;
        let addedToLog = this.state.addedToLog;

        return (

            <div>
                <Card style={{"height": "160px"}}>
                    <Image className="img-container" 
                      /*{this.props.item.picture}*/ />
                    
                    <Card.Content>
                        { <Card.Header></Card.Header>}
                        <br />
                        <Card.Meta className="text-blue font-italic "><center> Career Service Name: {this.props.careerDetails.name}</center> </Card.Meta>
                        <Card.Description>
                            <center>Address: {this.props.careerDetails.address}</center>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>

                        
                            {addedToLog ?
                                (<button>
                                    <p className="text-capitalize mb-0" disabled={true}>
                                        {" "}
                                        Added
                                            </p>
                                </button>
                                )
                                :
                                 (this.props.careerDetails.name === "Not Available") ?  
                                (<center><button style={{ "bottom": "20%" }} disabled={true}>Disabled</button></center>)
                                        :
                                (<center><button style={{ "marginTop": "5%" }} onClick={() => { this.addCareer(); this.props.addServiceToPage(this.props.careerDetails.name, this.props.careerDetails.address) }} >
                                        <span >
                                            Add Career Service
                                        </span>
                                </button></center>
                                    )
                                
                            }
                            <div style={{ display: "flex" }}>
                                
                            </div>
                        
                        
                    </Card.Content>
                </Card>



            </div>
        )
    }

}

