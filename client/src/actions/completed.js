import API from '../utils/API';

function findCompleted(id) {

    // return {
    //     type: 'COMPLETED',
    //     payload: id
    // }
    return dispatch => {
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