const SelectcontactReducer = (state = [], action) => {
    switch (action.type) {
        
        case 'selectcontlst':
            return action.payload
           
        default:
            return state
    }
}

export default SelectcontactReducer
