import { appApi } from '../../services/api';

export const actionTypes = {
    SET_LIST: "SET_LIST",
    ADD_LIST: "ADD_LIST",
    ADD_LIST_SUCCESS: "ADD_LIST_SUCCESS",
    ADD_LIST_FAILED: "ADD_LIST_FAILED",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LOADING: "SET_LOADING",
    SET_SELECTED_LIST_ID: "SET_SELECTED_LIST_ID",
    REMOVE_LIST: "REMOVE_LIST"
};

const setList = (list) => ({
    type: actionTypes.SET_LIST,
    payload: list
});

const setLoading = (status) => ({
    type: actionTypes.SET_LOADING,
    payload: status
});

const addList = (list) => ({
    type: actionTypes.ADD_LIST,
    payload: list
});

const addListSuccess = () => ({
    type: actionTypes.ADD_LIST_SUCCESS
});

const addListFailed = (error) => ({
    type: actionTypes.ADD_LIST_FAILED,
    payload: error
});

const removeList = (id) => ({
    type: actionTypes.REMOVE_LIST,
    payload: id
});

export default {
    fetchList: () => (dispatch) => {
        appApi.getList().then((list) => {
            list.forEach((item) => {
                item.color = item.color.name;
            });
            dispatch(setList(list));
        });
    },
    addList: (newListItem) => (dispatch, getState) => {
        dispatch(setLoading(true));
        appApi.addList(newListItem).then((item) => {
            const colors = getState().colorState.colors;
            item.color = colors.find((color) => color.id === item.colorId).name;
            dispatch(addList(item));
            dispatch(addListSuccess());
        }).catch((e) => {
            dispatch(addListFailed(e.response));
        }).finally(() => {
            dispatch(setLoading(false));
        });
    },
    setSelectedListId: (id) => ({
        type: actionTypes.SET_SELECTED_LIST_ID,
        payload: id
    }),
    removeList: (id) => (dispatch) => {
        setLoading(true);
        appApi.deleteList(id).then(() => {
            dispatch(removeList(id));
        }).finally(() => {
            setLoading(false);
        });
    }
}

