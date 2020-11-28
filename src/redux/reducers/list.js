import { actionTypes } from '../actions/list';

const initialState = {
    list: [],
    isLoading: false,
    addListSuccess: false,
    addListFailed: false,
    error: null,
    selectedListId: null
};

const list = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_LIST:
            return {
                ...state,
                list: action.payload
            };
        case actionTypes.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        case actionTypes.ADD_LIST:
            return {
                ...state,
                list: [...state.list, action.payload]
            };
        case actionTypes.ADD_LIST_SUCCESS:
            return {
                ...state,
                addListSuccess: true,
                addListFailed: false,
                error: null
            };
        case actionTypes.ADD_LIST_FAILED:
            return {
                ...state,
                addListSuccess: false,
                addListFailed: true,
                error: action.payload
            };
        case actionTypes.SET_SELECTED_LIST_ID:
            return {
                ...state,
                selectedListId: action.payload
            };
        case actionTypes.REMOVE_LIST:
            return {
                ...state,
                list: state.list.filter((listItem) => {
                    return listItem.id !== action.payload;
                })
            }
        default:
            return state;
    }
}

export default list;