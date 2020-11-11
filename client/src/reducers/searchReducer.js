

const searchReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SEARCH':
            console.log('payload')
            console.log(action.payload)
            return action.payload
    
        default:
            return state
    }
}

export default searchReducer;