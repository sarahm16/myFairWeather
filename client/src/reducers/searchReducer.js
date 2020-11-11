

const searchReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SEARCH':
            console.log(action.type)
            return action.payload
    
        default:
            return state
    }
}

export default searchReducer;