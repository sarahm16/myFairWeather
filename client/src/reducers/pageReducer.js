const pageReducer = (state = '', action) => {
    
    if(action.payload) return action.payload;
    
    return state;
    
}

export default pageReducer;