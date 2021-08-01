import React, {Component} from 'react';
import { Button, Form, FormGroup, Card, CardImg, Row, Label, Input, Col, FormFeedback} from 'reactstrap';
import { Link } from 'react-router-dom';
import Zoom from 'react-reveal/Zoom';
import { FadeTransform} from 'react-animation-components';
import { GoogleMap, withScriptjs, Marker, withGoogleMap } from 'react-google-maps';

 

function RenderMainImage(searchitem) {
    if(searchitem && (searchitem.photos.length>=5)){
 
        return(
            <div className = "container-fluid">
                <Zoom>
                    <Row >
                        <Col md={8}>               
                            <Card>                       
                                <CardImg  height="820" src={searchitem.primary_photo.href}/>                           
                            </Card>
                        </Col>
                        <Col md={4} >
                            <Card>
                                <CardImg  height="400" src={searchitem.photos[0].href} align />
                            </Card>
                            
                                <br/>
                            <Card>
                                <CardImg  height="400" src={searchitem.photos[1].href} mb-6 />
                            </Card>
                            
                        </Col>
                    </Row> 
                    <br/>
                    <Row>
                        <Col md={4}>
                            <Card>
                                <CardImg  height="400" src={searchitem.photos[2].href} />
                            </Card>
                        </Col>  
                        <Col md={4}>
                            <Card>
                                <CardImg  height="400" src={searchitem.photos[3].href} />
                            </Card>
                        </Col>  
                        <Col md={4}>
                            <Card>
                                <CardImg  height="400" src={searchitem.photos[4].href} />
                            </Card>
                        </Col>  
                    </Row> 
                </Zoom>

            </div>
        )
    }
    return <div />;
}


function RenderInfo(searchitem) {
    if(searchitem){
        return(
            <div className = "container-fluid">
                 <Row>
                    <Col md={6}>
                        <h4>{`${searchitem.location.address.line}, ${searchitem.location.address.city}, ${searchitem.location.address.state}`}</h4>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <h2> ${searchitem.list_price}</h2>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col md={1}>
                        <h4 style={{ color: 'grey' }}> Beds: </h4>
                    </Col >
                    <Col md={3}>
                        <h4> {searchitem.description.beds}</h4>
                    </Col>
                    <Col md={1}>
                        <h4  style={{ color: 'grey' }}>  Baths: </h4>
                    </Col >
                    <Col md={3}>
                        <h4> {searchitem.description.baths}</h4>
                    </Col>
                    <Col md={1}>
                        <h4  style={{ color: 'grey' }}> SqFt: </h4>
                    </Col >
                    <Col md={1}>
                        <h4> {searchitem.description.sqft}</h4>
                    </Col>
                </Row>
                <br/>
            </div>
        )
    }
    return <div />;
}


function RenderDescription(searchitem) {
    if(searchitem){
 
        return(
            <div className = "container-fluid">
                <Row>
                    <Col md={1}>
                        <h4 style={{ color: 'grey' }}>Year Built: </h4>
                    </Col>
                    <Col md={3} >
                        <h4> {searchitem.description.year_built}</h4>
                    </Col>
                    <Col md={1}>
                        <h4  style={{ color: 'grey' }}>Property Type:</h4>

                    </Col>
                    <Col md={3}>
                        <h4> {searchitem.description.type}</h4>
                    </Col>
                    <Col md={1}>
                        <h4  style={{ color: 'grey' }}>Lot-SqFt:</h4>

                    </Col>
                    <Col md={3}>
                        <h4> {searchitem.description.lot_sqft}</h4>
                    </Col>
                </Row>
                <br/>
                <br/>
            </div>
        )
    }
    return <div />;
}

class Tour extends Component{
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            phoneNum: '',
            email: '',
            date:'',
            time:'',
            notes: '',
            touched: {
                firstName: false,
                lastName: false,
                phoneNum: false,
                email: false,
                date: false,
                time: false
            }
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validate(firstName, lastName, phoneNum, email, date) {
        const errors = {
            firstName: '',
            lastName: '',
            phoneNum: '',
            email: '',
            date:''
        };

        if (this.state.touched.firstName) {
            if (firstName.length < 2) {
                errors.firstName = <h5 style={{color: 'red'}} > First name must be at least 2 characters.</h5>;
            } else if (firstName.length > 15) {
                errors.firstName = <h5 style={{color: 'red'}} > First name must be 15 or less characters.</h5>;
            }
        }

        if (this.state.touched.lastName) {
            if (lastName.length < 2) {
                errors.lastName = <h5 style={{color: 'red'}} > Last name must be at least 2 characters.</h5>;
            } else if (lastName.length > 15) {
                errors.lastName = <h5 style={{color: 'red'}} > Last name must be 15 or less characters.</h5>;
            }
        }

        const reg = /^\d+$/;
        if (this.state.touched.phoneNum && !reg.test(phoneNum)) {
            errors.phoneNum = <h5 style={{color: 'red'}} > The phone number should contain only numbers.</h5>;
        }

        if (this.state.touched.email && !email.includes('@')) {
            errors.email = <h5 style={{color: 'red'}} > Email should contain a @</h5>;
        }

        if (this.state.touched.date) {
            if (date <  new Date() ){
                errors.date = <h5 style={{color: 'red'}} > Please pick a future date.</h5>;
            }
        }

        return errors;
    }

    handleBlur = (field) => () => {
        this.setState({
            touched: {...this.state.touched, [field]: true}
        });
    }


    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name] : value
        })
    }

    handleSubmit(event) {
        
        alert('Thank you for scheduling the home tour with us, ' + this.state.firstName + ' ' + this.state.lastName +'!'+ '\n' + 'We will see you at ' + this.state.time + ' on ' + this.state.date +'.');
        event.preventDefault();
        }

    render(){
        const errors = this.validate(this.state.firstName, this.state.lastName, this.state.phoneNum, this.state.email, this.state.date);   
        return (
                <div className="container-fluid">
                    <div>
                        <h2 style={{color:"green", fontWeight: 'bold', fontSize:'4.5vh'}} align="center">Schedule Your Tour</h2>
                        <hr /> <hr /> <hr />
                    </div>
                    <div >
                        <Form onSubmit={this.handleSubmit} >
                        <FormGroup row>
                                <Label htmlFor="firstName" md={2} align="right"><h4>First Name</h4></Label>
                                <Col md={4}>
                                    <Input type="text" id="firstName" name="firstName"
                                        placeholder="First Name"
                                        value={this.state.firstName}
                                        invalid={errors.firstName}
                                        onBlur={this.handleBlur("firstName")}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.firstName}</FormFeedback>
                                </Col>
                          
                                    <Label htmlFor="lastName" md={2} align="right"><h4>Last Name</h4></Label>
                            
                                <Col md={4}>
                                    <Input type="text" id="lastName" name="lastName"
                                        placeholder="Last Name"
                                        value={this.state.lastName}
                                        invalid={errors.lastName}
                                        onBlur={this.handleBlur("lastName")}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.lastName}</FormFeedback>
                                </Col>
                            </FormGroup>
                          
                            <FormGroup row>
                                <Label htmlFor="phoneNum" md={2} align="right"><h4>Phone</h4></Label>
                                <Col md={4}>
                                    <Input type="tel" id="phoneNum" name="phoneNum"
                                        placeholder="Phone number"
                                        value={this.state.phoneNum}
                                        invalid={errors.phoneNum}
                                        onBlur={this.handleBlur("phoneNum")}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.phoneNum}</FormFeedback>
                                </Col>
                                <Label htmlFor="email" md={2} align="right"><h4>Email</h4></Label>
                                <Col md={4}>
                                    <Input type="email" id="email" name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        invalid={errors.email}
                                        onBlur={this.handleBlur("email")}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.email}</FormFeedback>
                                </Col>
                            </FormGroup>
                          
                            <FormGroup row>
                                <Label htmlFor="date" md={2} align="right"><h4>Date</h4></Label>
                                    <Col md={4}>
                                        <Input type="date" id="date" name="date" placeholder="mm/dd/yyyy"
                                        value={this.state.date}
                                        invalid={errors.date}
                                        onBlur={this.handleBlur("date")}
                                        onChange={this.handleInputChange}/>
                                        <FormFeedback>{errors.date}</FormFeedback>
                                    </Col>
                                    <Label htmlFor="time" md={2} align="right"><h4>Time</h4></Label>
                                    <Col md={4}>
                                        <Input type="time" id="time" name="time"
                                        value={this.state.time}                                      
                                        onChange={this.handleInputChange}/>
                                    </Col>
                            </FormGroup>
                        
                            <FormGroup row>
                                <Label htmlFor="notes" md={2} align="right"><h4>Notes (Optional)</h4></Label>
                                <Col md={4}>
                                    <Input type="textarea" id="notes" name="notes"
                                        rows="6"
                                        value={this.state.notes}
                                        onChange={this.handleInputChange}></Input>
                                </Col>
                                <Col className="align-self-end" align="center">
                                    <Button type="submit" size="lg" color="success" style={{fontSize: '3vh'}}>
                                        Schedule Tour
                                    </Button>
                                </Col>
                            </FormGroup>
                            
                        </Form>
                    </div>
                </div>
        
        );
    }
}


function Map(searchitem){
    if (searchitem.location.address.coordinate!==null){
    function showMap() {

        if(searchitem ){
           
            return (
    
            <GoogleMap
            defaultZoom={13}
            defaultCenter={{lat: searchitem.location.address.coordinate.lat, lng: searchitem.location.address.coordinate.lon}}>
            <Marker
                position={{lat:searchitem.location.address.coordinate.lat, lng: searchitem.location.address.coordinate.lon}} />
            </GoogleMap>)}}
    
    const WrappedMap = withScriptjs(withGoogleMap(showMap))
  
  return (
    <div style = {{ width: '50vw', height: '50vh'}}>
    <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{height: '100%'}}/>}
        containerElement={<div style={{ height: '100%'}}/>}
        mapElement={<div style={{height:'100%'}} />} />
      
    </div>
  )}
  return <div />
}

function Video(searchitem){
    if(searchitem.virtual_tours!==null){
        return (
            <div>
                <iframe src={searchitem.virtual_tours[0].href}
                frameborder='0'
                allow='autoplay; encrypted-media'
                allowfullscreen
                title='video'
                width={950}
                height={550}
                />
             
            </div>

        )
    }
    return <div />
}

function SearchItem (props) {
    if (props.searchitem ){
            return (
                console.log("searchresult",props.searchitem),
                <div className="container-fluid">
                    
                    <Row>
                        <Col className="mx-3">
                        <Link to={`/searchresults${props.city}`}><Button color="outline-light" style={{fontSize:'3vh'}}> Back to Search Results</Button></Link>
                        </Col>
                    </Row>
                    <br/><br/>
                    {RenderMainImage(props.searchitem)}
                    <br/><br/>
                    {RenderInfo(props.searchitem)}
                
                    {RenderDescription(props.searchitem)}
                    <br/><br/><br/>
                    <Row style={{justifyContent: "center"}}>
                    {Map(props.searchitem)}
                
                    </Row>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <Row style={{justifyContent: "center"}}>
                  
                    {Video(props.searchitem)}
                    </Row>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <FadeTransform
                                    in
                                    transformProps={{
                                        exitTransform: 'scale(0.5) translateY(50%)'
                                    }}>

                        <Tour/>
                    </FadeTransform>
                </div>
           )
        }
        return <div/>
        }



export default SearchItem;