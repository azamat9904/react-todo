import { actionTypes } from '../actions/colors';

const initialState = {
    colors: [],
    selectedColor: null
};

const colors = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_COLORS:
            return {
                ...state,
                colors: action.payload
            };
        case actionTypes.SET_SELECTED_COLOR:
            return {
                ...state,
                selectedColor: action.payload
            }
        default:
            return state;
    }
}

export default colors;