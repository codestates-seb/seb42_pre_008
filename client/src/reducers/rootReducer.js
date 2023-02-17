const init = []
const rootReducer = ( state = init , action ) => {
    switch (action.type){
        case 'READ':
            return action.payload
        default:
            return state;
    }
};
export default rootReducer