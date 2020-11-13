

const searchReducer = (state = {isLoading: true}, action) => {
    switch (action.type) {
        case 'SEARCH_REQUEST':
            return {isLoading: true}
        case 'SEARCH':
            return {results: action.payload, isLoading: false}
        case 'FAVORITES':
            //console.log(action.payload)
            return {results: action.payload, isLoading: false}
        case 'COMPLETED':
            console.log(action.payload)
            return {results: action.payload, isLoading: false}
        case 'RESET_SEARCH':
            return {results: [], isLoading: false}
        default:
            return state
    }
}

export default searchReducer;