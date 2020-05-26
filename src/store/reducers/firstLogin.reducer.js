import * as actionTypes from '../actions/types';

const initialState = {
    stage: 0,
    progress: [0, 17, 33, 50, 67, 83],
    username: '',
    gender: '',
    birthdate: '',
    language: '',
    tags: [],
    selectedTags: [],
};

const update = (state, action) => {
    return {
        ...state,
        [action.name]: action.value,
    };
};

const goBack = (state) => {
    let curStage = state.stage;
    if (curStage > 0) {
        curStage -= 1;
    }
    return {
        ...state,
        stage: curStage,
    };
};

const next = (state) => {
    const curStage = state.stage;

    return {
        ...state,
        stage: curStage + 1,
    };
};

const updateTag = (state, action) => {
    const { selectedTags } = state;
    const index = selectedTags.indexOf(action.value);
    if (index === -1) {
        const tags = selectedTags.concat(action.value);
        return {
            ...state,
            selectedTags: tags,
        };
    }
    const tags = selectedTags.filter((el, i) => {
        return i !== index;
    });
    return {
        ...state,
        selectedTags: tags,
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_FIRST_LOGIN:
            return update(state, action);

        case actionTypes.GO_BACK:
            return goBack(state);
        case actionTypes.NEXT:
            return next(state);
        case actionTypes.GET_TAGS:
            return update(state, action);
        case actionTypes.SELECT_TAG:
            return updateTag(state, action);

        default:
            return state;
    }
};

export default reducer;
