import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { search } from '../actions/search';
import resetSearch from '../actions/reset';

import Button from '../components/button';
import Label from '../components/label';
import Results from './results';
import Navbar from '../components/navbar';
import Alert from '../components/alert';

import M from 'materialize-css';

import './styles.css';

let zipcodes = require('zipcodes');

class Search extends Component {
    constructor() {
        super();
            this.state = {
                trails: [],
                minLength: "",
                maxElevation: "",
                maxTravel: "",
                sort: "quality",
                latitude: 0,
                longitude: 0,
                zipcode: '',
                hikes: [],
                invalidZip: false,
                isSubmitted: false,
                elevationOptions: [100, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000],
                distanceOptions: [5, 10, 15, 25, 50, 100]
            };
            this.onSubmit=this.onSubmit.bind(this);     
    }

    componentWillMount() {
        this.props.resetSearch();
    }

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
            this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude})
          });
    }

    onChange = event => {
        this.setState({
            [event.target.id]: event.target.value,
            isSubmitted: false
        })
    }

    searchHikes = () => {
        //grab user inputs from search form
        const { latitude, longitude, minLength, maxTravel, maxElevation, sort } = this.state;
        console.log(this.state.latitude)
        //dispatch search action to search reducer
        this.props.search(latitude, longitude, minLength, maxTravel, maxElevation, sort);
    }

    onSubmit = (event) => {
        event.preventDefault();

        let { zipcode } = this.state;

        if(zipcode !== '') {
            if(zipcodes.lookup(zipcode)) {
                console.log(zipcodes.lookup(zipcode).latitude)
                this.setState({
                    latitude: zipcodes.lookup(zipcode).latitude,
                    longitude: zipcodes.lookup(zipcode).longitude
                }, () => this.searchHikes());
                
            }
            else {this.setState({invalidZip: true})}
        }
        //search using latitude and longitude if zipcode is blank
        else{this.searchHikes()}
        //this.state.invalidZip === false ? this.searchHikes() : console.log('invalid zip no search');     
    }

    render() {
        //this.props.resetSearch();
        return(
            <div>
                <Navbar page='search'/>
                <div className='search row index-card-bg'>
                    <div className='push-m2 col-pad'>
                        <form className="form-background" noValidate onSubmit={this.onSubmit.bind(this)}>
                            <div className='col s4 m4'>
                                Use current location <br />
                                <i className="material-icons">my_location</i>
                            </div>
                            <div className='col s3 m4 or'>OR</div>
                            
                            <div className='input-field zipcode-field col s5 m4 '>                                
                                <input
                                    onChange={this.onChange}
                                    value={this.state.zipcode}
                                    id="zipcode"
                                    type='number'
                                />
                                <label className='zipcode-label' htmlFor="zipcode">Enter Zipcode:</label>
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
                                    {this.state.distanceOptions.map(distance => {
                                        return(<option value={`${distance}`} key={distance}>{distance} miles</option>)
                                    })}
                                </select>
                            </div>
                            <div className="input-field col s12">
                                <select
                                onChange={this.onChange}
                                value={this.state.maxElevation}
                                id="maxElevation">
                                >
                                    <option value="">Select Max Elevation Gain</option>
                                    {this.state.elevationOptions.map(option => {
                                        return(<option value={`${option}`} key={option}>{option} ft</option>)
                                    })}
                                </select>
                            </div>
                            <div className='sort-field'>
                                <div className=' col s4 sort-buttons'>Sort by:</div>  
                                <div className=' col s4 sort-buttons'>
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
                                <div className=' col s4 sort-buttons'>
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
                            </div>
                            <div className='row'>
                                <div className='search-button col s12'>
                                    <Button name='Search Hikes' type='submit' />
                                </div>
                            </div>
                        </form>
                        {this.props.isLoading && <div className="progress">
                            <div className="indeterminate"></div>
                        </div>}
                        {!this.props.isLoading && <div>
                            <Results
                                page='search'
                            />
                        </div>}
                        {this.state.invalidZip && <Alert page='invalid zip'/>}
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
    auth: state.auth,
    isLoading: state.search.isLoading
  });

  
  export default connect(
    mapStateToProps,
    { search, resetSearch }
  )(Search);

