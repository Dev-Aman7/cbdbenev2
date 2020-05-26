import * as actionTypes from '../actions/types';

const initialState = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGN_IN:
            return state;

        default:
            break;
    }

    return state;
};

export default reducer;
