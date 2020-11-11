import axios from 'axios';

export const search = () => {
    return {
      type: 'SEARCH',
      payload: 'test search results'
    }
  }