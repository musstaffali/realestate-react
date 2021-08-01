import React, { Component, Fragment  } from 'react';
import HouseList from './HouseListComponent';
import HouseItem from './HouseItemComponent';
import SearchList from './SearchListComponent';
import SearchItem from './SearchItemComponent';
import { HOUSEDETAILS } from '../shared/housedetails';
import { HOUSEINFO } from '../shared/houseinfo';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row} from 'reactstrap';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            housedetails: HOUSEDETAILS,
            houseinfo: HOUSEINFO,
            city:"",
            state:"",
            pricemin:"",
            pricemax:"",
            searchresults:[],
            isloading: false,
            favorite: false,
    
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
     
    }


    citySearch = async () => {
    this.setState({isloading: true})
    fetch(`https://us-real-estate.p.rapidapi.com/for-sale?offset=0&limit=200&state_code=${this.state.state}&city=${this.state.city}&sort=newest&price_min=${this.state.pricemin}&price_max=${this.state.pricemax}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": `${process.env.REACT_APP_REAL_ESTATE_API_KEY}`,
		"x-rapidapi-host": "us-real-estate.p.rapidapi.com"
	}
    })

    .then(response => 
        response.json())
    .then(data =>{
        this.setState({
            searchresults: data.data.results
        });
        this.setState({isloading: false})
    })
 
    .catch(error => {
        const newError = new Error("Wrong City or State", error);
        throw newError
        });
    }

handleSubmit = (e) => {
    e.preventDefault();
    
    this.citySearch();
    this.setState({pricemin:"", pricemax:""})
  
}


handleInputChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
}
    render() {
        const SearchResults =()=>{
            return (
                <SearchList  
                searchresults={this.state.searchresults} 
                city={this.state.city} 
                state={this.state.state} 
                isloading={this.state.isloading} 
              
              />
            )
        }

        const HouseId = ({match}) => {
            return (
                <HouseItem 
                    houseitem={this.state.housedetails.filter(houseitem => houseitem.id === +match.params.id)[0]}
                    houseinfo={this.state.houseinfo.filter(houseinfo => houseinfo.id === +match.params.id)[0]} />
            )
        }

        const SearchId = ({match}) => {
            const singlelist =[]
            this.state.searchresults.forEach(function(item, index){   // use foreach to loop all the lists and find the one match with the id
                    if(+match.params.id === item.property_id){
                    singlelist.push(item)
                    }})
                return (
                    <SearchItem 
                        searchitem = {singlelist[0]}
                        city={this.state.city}/>  // need [0] to get the content of the data
                        )}
            return (
            <div className="container-fluid">
                <Header />
                <Switch>
                        <Route path='/home' render={() => 
                        <Fragment>  
                            <div style={{fontSize:"3vh"}} className="ml-5">
                                <Row>
                                    <div className='col col-md-1 ml-5'>
                                        <label for="site-search" >City:</label>
                                    </div>
                                    <div className='col col-md-4 mx-auto'>
                                        <input type="search" id="city"  name="city"
                                            onChange={this.handleInputChange} />
                                    </div>
                                    <span>&nbsp;&nbsp;</span>
                                    <div className='col col-md-1 '>
                                        <label for="site-search">State:</label>
                                    </div>
                                    <div className='col col-md-4 mx-auto'>
                                        <input type="search" id="state" name="state"
                                            onChange={this.handleInputChange} />
                                    </div>
                                </Row>
                                <br/>
                                <Row>
                                    <div className='col col-md-1 ml-5'> 
                                        <label for="site-search" ><span>Min Price:</span></label>
                                    </div>
                                    <div className='col col-md-4 mx-auto'>
                                        <input type="search" id="pricemin"  name="pricemin"
                                            onChange={this.handleInputChange} />
                                    </div>
                                    <span>&nbsp;&nbsp;</span>
                                    <div className='col col-md-1 '>
                                        <label for="site-search" >Max Price:</label>
                                    </div>
                                    <div className='col col-md-4 mx-auto'>
                                        <input type="search" id="pricemax" name="pricemax"
                                            onChange={this.handleInputChange} />
                                    </div>
                                </Row>
                                <br/><br/>
                                <Row>
                                    <div className='col col-md-3 mx-auto'>
                                        <button type="submit" class="btn btn-outline-light btn-lg btn-block" style={{fontSize: '4vh'}} onClick={this.handleSubmit} ><Link to={`/searchresults${this.state.city}`}>Search</Link></button>
                                    </div>
                                </Row>
                               
                            </div>
                            <br/><br/><br/>  <br/><br/><br/>
                            
                            <HouseList houseinfo={this.state.houseinfo} />
                            
                        </Fragment> }/> 
                        {/* // above code is to render searchlist and houselist 2 components on the same home page */}
                        <Route extact path={`/searchresults:${this.state.city}`} component={SearchResults} />
                        <Route path='/houselist:id' component={HouseId} /> 
                        <Route path='/searchresult:id' component={SearchId} /> 
                        <Redirect to ='/home' />
                </Switch>
                <Footer />
                
            </div>
        )
    }
}

export default Main;