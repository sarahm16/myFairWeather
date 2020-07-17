import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";



import Button from '../button';
import Label from '../label';
import Results from './results';
import Navbar from '../navbar';
import API from '../../utils/API';

import M from 'materialize-css';

import './styles.css';

let zipcodes = require('zipcodes');

class Search extends Component {
    componentDidMount() {
        //redirect user to login page if user is not logged in
        if(!this.props.auth.isAuthenticated) {
            this.props.history.push('/login')
        }

        //initialize Materialize
        M.AutoInit();

        //locate users current location
        if ("geolocation" in navigator) {
            console.log("Current location is Available");
          } else {
            console.log("Current location is Not Available");
          }
          navigator.geolocation.getCurrentPosition((position) => {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude})
          });
    }

    constructor() {
        super();
            this.state = {
            minLength: "",
            maxElevation: "",
            maxTravel: "",
            sort: "",
            latitude: 0,
            longitude: 0,
            zipcode: '',
            hikes: [],
            isSubmitted: false
            };
            this.onSubmit=this.onSubmit.bind(this);     
      }

    onChange = event => {
        this.setState({
            [event.target.id]: event.target.value,
            isSubmitted: false
        })
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({
            isSubmitted: true
        })

        //let {lat, lon, length, dist, elev, sort, zipcode } = this.props
        if(this.state.zipcode !== '') {
            if(zipcodes.lookup(this.state.zipcode)) {
                this.setState({
                    latitude: zipcodes.lookup(this.state.zipcode).latitude,
                    longitude: zipcodes.lookup(this.state.zipcode).longitude
                })
                
            }
            //worry about this later

            // else {
            //     console.log('invalid zip')
            //     this.setState({
            //         invalidZip: true,
            //         page: 'invalid zip',
            //         loading: false
            //     })
            // }
        }
        API.searchHikes(this.state.latitude, this.state.longitude, this.state.minLength, this.state.maxTravel, this.state.maxElevation, this.state.sort)
            .then(res => {
                console.log('successful search');
                if(this.state.maxElevation !== null){
                    const filteredHikes = res.data.trails.filter(trail => trail.ascent < this.state.maxElevation)
                    
                    let filtered = filteredHikes.slice(0, 4);
                    //useResults(filtered, 'search-results')
                    //useResults(filteredHikes, 'search-results')
                }
                else {
                    //display first 5 results
                    let results = res.data.trails.slice(0, 4);
                    //useResults(results, 'search-results')
                    //useResults(res.data.trails, 'search-results')
                }
            })        
    }

    render() {
        return(
            <div>
                <Navbar page='search'/>
                <div className='search row index-card-bg'>
                    <div className='push-m2 col-pad'>
                        <form className="form-background" noValidate onSubmit={this.onSubmit.bind(this)}>
                            <div className='col s4 m5'>
                                Search by current location <br />
                                <i className="material-icons">my_location</i>
                            </div>
                            <div className='col s4 m2 or'>OR</div>
                            <div className='input-field col s4 m5'>                                <input
                                    onChange={this.onChange}
                                    value={this.state.zipcode}
                                    id="zipcode"
                                />
                                <label className='active' htmlFor="zipcode">Enter Your Zipcode:</label>
                            </div>
                            <div className='input-field col s12 divider'></div>
                            <div className='input-field col s12'>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.minLength}
                                    id="minLength"
                                    type="number"
                                />
                                <Label name='Minimum Hike Length' />
                            </div>
                            <div className="input-field col s12">
                                <select
                                onChange={this.onChange}
                                value={this.state.maxTravel}
                                id="maxTravel">
                                    <option value="">Select Max Distance to Trailhead</option>
                                    <option value= "5" >5 miles</option>
                                    <option value="10">10 miles</option>
                                    <option value="15">15 miles</option>
                                    <option value="25">25 miles</option>
                                    <option value="50">50 miles</option>
                                    <option value="100">100 miles</option>
                                </select>
                            </div>
                            <div className="input-field col s12">
                                <select
                                onChange={this.onChange}
                                value={this.state.maxElevation}
                                id="maxElevation">
                                >
                                    <option value="">Select Max Elevation Gain</option>
                                    <option value="100">100 ft</option>
                                    <option value="1000">1000 ft</option>
                                    <option value="2000">2000 ft</option>
                                    <option value="3000">3000 ft</option>
                                    <option value="4000">4000 ft</option>
                                    <option value="5000">5000 ft</option>
                                    <option value="6000">6000 ft</option>
                                    <option value="7000">7000 ft</option>
                                    <option value="8000">8000 ft</option>
                                    <option value="9000">9000 ft</option>
                                    <option value="10000">10000 ft</option>
                                </select>
                            </div>
                            <div className='col s4 sort-buttons'>Sort by:</div>  
                                <div className='col s4 sort-buttons'>
                                    <label>
                                        <input 
                                        onChange={this.onChange} 
                                        value='distance'
                                        id='sort' className="with-gap" 
                                        name="group1" type="radio" 
                                        checked={this.state.sort === 'distance'}  />
                                        <span>Distance</span>
                                    </label>
                                </div>
                            <div className='col s4 sort-buttons'>
                                <label>
                                    <input 
                                    onChange={this.onChange} 
                                    value='quality'
                                    id='sort' className="with-gap" 
                                    name="group1" type="radio" 
                                    checked={this.state.sort === 'quality'}  />
                                    <span>Quality</span>
                                </label>
                            </div>
                            <br />
                            <br />
                            <div className='row'>
                                <div className='col s12'>
                                    <Button name='Search Hikes' type='submit' />
                                </div>
                            </div>
                        </form>
                        {this.state.isSubmitted && <Results
                            sort={this.state.sort}
                            zipcode={this.state.zipcode}
                            type='search-results'
                            dist={this.state.maxTravel}
                            length={this.state.minLength}
                            lat={this.state.latitude}
                            lon={this.state.longitude}
                            elev={this.state.maxElevation}
                            />}
                    </div>
                </div>
            </div>
        )        
    }
    
}


Search.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps
  )(Search);

