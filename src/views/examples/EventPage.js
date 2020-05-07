/*!

=========================================================
* Paper Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
    Button,
    Label,
    FormGroup,
    Input,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Container,
    Row,
    Col
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import EventPageHeader from "components/Headers/EventPageHeader.js";

const ProfilePage = props => {
    //debugger 
    let myCareerArray = props.myCareerServices

    const [activeTab, setActiveTab] = React.useState("1");

    const toggle = tab => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("landing-page");
        return function cleanup() {
            document.body.classList.remove("landing-page");
        };
    });

    let handleRemove = (idx) => {
        props.handleRemove(idx)
    }

    let myCareerServices = () => {
        //debugger 
        //debugger 
        if (myCareerArray.length < 1) 
            return <center><h3 className="text-muted"> No services have been added yet :(</h3></center>
        else 

        return myCareerArray.map((careerObject, idx) => { 

            return <>
                <Row>
                    <Col className="ml-auto mr-auto" lg="2" md="4" xs="4">
                        <img
                            alt="..."
                            className="img-circle img-no-padding img-responsive"
                            src={require("assets/img/faces/company" + (idx + 1) % 3  + ".jpg")}
                        />
                    </Col>
                    <Col className="ml-auto mr-auto" lg="7" md="4" xs="4">
                        <h6>
                            {careerObject.name}<br />
                            <small>{careerObject.address}</small>
                        </h6>
                    </Col>
                    <Col className="ml-auto mr-auto" lg="3" md="4" xs="4">
                        <Button
                            onClick={() => { handleRemove(idx) }}
                        >
                            Remove
                        </Button>
                    </Col>
                </Row>
                <br /> 
            </>                 
        })
    }

    return (
        
        <>
            <ExamplesNavbar />
            <EventPageHeader />
            <div className="section profile-content">
                <Container>
                    <div className="owner">
                        <div className="avatar">
                            <img
                                alt="..."
                                className="img-circle img-no-padding img-responsive"
                                src="https://www.unahealydesign.com/wp-content/uploads/2014/03/blog-working-with-Graphic-Designer-1200x557.jpg"
                            />
                        </div>
                        <div className="name">
                            <h4 className="title">
                                {localStorage.name.charAt(0).toUpperCase() + localStorage.name.slice(1)}'s Career Services <br />
                            </h4>
                            
                        </div>
                    </div>
                    <Row>
                        <Col className="ml-auto mr-auto text-center" md="6">
                            <p>
                                Your friends and finances await!
                            </p>
                            <br />
                            <br /> 
                        </Col>
                    </Row>
                    <br />
                    <div className="nav-tabs-navigation">
                        <div className="nav-tabs-wrapper">
                            <Nav role="tablist" tabs>
                                <NavItem>
                                    <NavLink
                                        className={activeTab === "1" ? "active" : ""}
                                        onClick={() => {
                                            toggle("1");
                                        }}
                                    >
                                        Personal
                            </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={activeTab === "2" ? "active" : ""}
                                        onClick={() => {
                                            toggle("2");
                                        }}
                                    >
                                        Friends
                            </NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                    </div>
                    {/* Tab panes */}
                    <TabContent className="following" activeTab={activeTab}>
                        <TabPane tabId="1" id="follows">
                           {myCareerServices()}
                        </TabPane>
                        <TabPane className="text-center" tabId="2" id="following">
                            
                            <Row>
                                <Col className="ml-auto mr-auto" lg="2" md="4" xs="4">
                                    <img
                                        alt="..."
                                        className="img-circle img-no-padding img-responsive"
                                        src={require("assets/img/faces/company2.jpg")}
                                    />
                                </Col>
                                <Col className="ml-auto mr-auto" lg="7" md="4" xs="4">
                                    <h6>
                                            Imade's Career Network <br /> <br />  
                                        <small>Career Service Name: Philadelphia Works, Inc </small><br />
                                        <small>Address: 1617 John F Kennedy Blvd 13th floor, Philadelphia, PA 19103, United States</small>
                                    </h6>
                                </Col>
                                <Col >
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultChecked
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </Container>
            </div>
            
        </>
    );
}

export default ProfilePage;
