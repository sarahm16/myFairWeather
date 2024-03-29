import API from '../utils/API';

function findCompleted(id) {
    return dispatch => {
        dispatch({type: 'SEARCH_REQUEST'});

        API.displayCompleted(id)
            .then(res => {
                dispatch({
                    type: 'COMPLETED',
                    payload: res.data
                })
            })
    }
}

export default findCompleted;