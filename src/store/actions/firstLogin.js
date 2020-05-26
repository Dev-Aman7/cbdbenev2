// --no-verify
import * as actionTypes from './types';

export const update = (name, value) => {
    return {
        type: actionTypes.UPDATE_FIRST_LOGIN,
        name,
        value,
    };
};

export const goBack = () => {
    return {
        type: actionTypes.GO_BACK,
    };
};

export const next = () => {
    return {
        type: actionTypes.NEXT,
    };
};

export const getTags = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.GET_TAGS,
            name: 'tags',
            value: [
                'python',
                'c++',
                'algorithm',
                'java',
                'dsa',
                'coding',
                'python',
                'c++',
                'algorithm',
                'java',
                'dsa',
                'coding',
                'python',
                'c++',
                'algorithm',
                'java',
                'dsa',
                'coding',
            ],
        });
    };
};

export const selectTag = (value) => {
    return {
        type: actionTypes.SELECT_TAG,
        value,
    };
};
