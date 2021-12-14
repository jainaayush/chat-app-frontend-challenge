const personReducer = (state = 0, action) => {
    switch (action.type) {
        
        case 'setuser':
            return [action.payload]
           
        default:
            return state
    }
}

export default personReducer
