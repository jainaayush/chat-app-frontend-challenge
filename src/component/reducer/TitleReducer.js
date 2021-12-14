const TitleReducer = (state = 0, action) => {
    switch (action.type) {
        
        case 'titleid':
            return action.payload
           
        default:
            return state
    }
}

export default TitleReducer
