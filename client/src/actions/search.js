import axios from 'axios';
import API from '../utils/API';

export const search = (latitude, longitude, minLength, maxTravel, maxElevation, sort) => {
  return dispatch => {
    API.searchHikes(latitude, longitude, minLength, maxTravel, maxElevation, sort)
      .then( res => {
        if(maxElevation !== null) {

          dispatch({type: 'SEARCH_REQUEST'});

          const filteredHikes = res.data.trails.filter(trail => trail.ascent < maxElevation)
          
          dispatch({
            type: 'SEARCH',
            payload: filteredHikes
          })
        }
        else {

          dispatch({type: 'SEARCH_REQUEST'});

          dispatch({
            type: 'SEARCH',
            payload: res.data.trails
          })
        }
      })
  }
  
  
  // API.searchHikes(latitude, longitude, minLength, maxTravel, maxElevation, sort)
  //   .then(res => {
  //     console.log(res);
  //   })  
  // return {
  //     type: 'SEARCH',
  //     payload: 'test search results'
  //   }
  }