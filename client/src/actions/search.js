import axios from 'axios';
import API from '../utils/API';

export const search = (latitude, longitude, minLength, maxTravel, maxElevation, sort) => {
  API.searchHikes(latitude, longitude, minLength, maxTravel, maxElevation, sort)
    .then(res => {
      console.log(res);
    })  
  return {
      type: 'SEARCH',
      payload: 'test search results'
    }
  }