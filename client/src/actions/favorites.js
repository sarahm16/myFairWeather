import { connect } from 'react-redux';

import API from '../utils/API';

function findFavorites(id) {

    return dispatch => {
        API.displayFavorites(id)
            .then(res => {
                dispatch({
                    type: 'FAVORITES',
                    payload: res.data
                })
            })
    }
}

export default findFavorites;