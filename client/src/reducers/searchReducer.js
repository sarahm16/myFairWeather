

const searchReducer = (state = {isLoading: true}, action) => {
    switch (action.type) {
        case 'SEARCH_REQUEST':
            return {isLoading: true}
        case 'SEARCH':
            //console.log('payload')
            //console.log(action.payload)
            //return {results: action.payload, isLoading: false}
            return {results: action.payload, isLoading: false}
        case 'FAVORITES':
            //console.log(action.payload)
            return {results: action.payload, isLoading: false}
    
        default:
            return state
    }
}

export default searchReducer;