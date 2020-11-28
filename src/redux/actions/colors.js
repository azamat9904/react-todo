import { appApi } from '../../services/api';

export const actionTypes = {
    SET_COLORS: "SET_COLORS",
    SET_SELECTED_COLOR: "SET_SELECTED_COLOR"
}

const setColors = (colors) => ({
    type: actionTypes.SET_COLORS,
    payload: colors
});

const actions = {
    setSelectedColor: (color) => ({
        type: actionTypes.SET_SELECTED_COLOR,
        payload: color
    }),
    fetchColors: () => (dispatch) => {
        appApi.getColors().then((colors) => {
            dispatch(setColors(colors));
            dispatch(actions.setSelectedColor(colors[0]));
        });
    },
}

export default actions;

