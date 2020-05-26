import * as actionTypes from '../actions/types';

const initialState = {
    username: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGN_IN:
            return { ...state, username: 'aman' };
        case actionTypes.SIGN_UP:
            return state;
        default:
            return state;
    }
};

export default reducer;
