import { actionTypes } from '../actions/list';

const initialState = {
    list: [],
    isLoading: false,
    addListSuccess: false,
    addListFailed: false,
    error: null,
    selectedListId: null,
    selectedList: null,
    updateListNameSuccess: false,
    updateListNameFailed: false,
    updateListNameError: null,
    addNewTaskSuccess: false,
    addNewTaskFailed: false,
    addNewTaskError: null,
    updateTaskSuccess: false,
    updateTaskFailed: false,
    updateTaskError: null
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
                list: [...state.list, action.payload],
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
                selectedListId: action.payload,
                selectedList: state.list.find((listItem) =>
                    listItem.id === action.payload) ? state.list.find((listItem) => listItem.id === action.payload) : -1
            };
        case actionTypes.REMOVE_LIST:
            return {
                ...state,
                list: state.list.filter((listItem) => {
                    return listItem.id !== action.payload;
                })
            };
        case actionTypes.CHANGE_TASK_STATUS:
            return {
                ...state,
                list: state.list.filter((listItem) => {
                    if (listItem.id === action.payload.id) {
                        return action.payload;
                    }
                    return listItem;
                }),
                selectedList: action.payload
            };
        case actionTypes.UPDATE_LIST_NAME:
            return {
                ...state,
                list: state.list.filter((listItem) => {
                    if (listItem.id === state.selectedListId) {
                        listItem.name = action.payload;
                        return { ...listItem };
                    }
                    return listItem;
                }),
                selectedList: { ...state.selectedList, name: action.payload }
            };
        case actionTypes.UPDATE_LIST_NAME_SUCCESS:
            return {
                ...state,
                updateListNameSuccess: true,
                updateListNameFailed: false,
                updateListNameError: null
            };
        case actionTypes.UPDATE_LIST_NAME_FAILED:
            return {
                ...state,
                updateListNameSuccess: false,
                updateListNameFailed: true,
                updateListNameError: action.payload
            };
        case actionTypes.ADD_NEW_TASK:
            return {
                ...state,
                list: state.list.filter((listItem) => {
                    if (listItem.id === state.selectedListId) {
                        listItem.tasks = action.payload.tasks;
                        return { ...listItem }
                    }
                    return listItem;
                }),
                selectedList: action.payload,
                addNewTaskSuccess: false,
                addNewTaskFailed: false,
                addNewTaskError: null
            };
        case actionTypes.ADD_NEW_TASK_SUCCESS:
            return {
                ...state,
                addNewTaskSuccess: true,
                addNewTaskFailed: false,
                addNewTaskError: null
            };
        case actionTypes.ADD_NEW_TASK_FAILED:
            return {
                ...state,
                addNewTaskSuccess: false,
                addNewTaskFailed: true,
                addNewTaskError: action.payload
            };
        case actionTypes.REMOVE_TASK:
            return {
                ...state,
                list: state.list.filter((listItem) => {
                    if (listItem.id === state.selectedListId) {
                        listItem.tasks = action.payload.tasks;
                        return { ...listItem }
                    }
                    return listItem;
                }),
                selectedList: action.payload,
            };
        case actionTypes.UPDATE_TASK_TEXT:
            return {
                ...state,
                list: state.list.filter((listItem) => {
                    if (listItem.id === action.payload.id) {
                        listItem.tasks = action.payload.tasks;
                        return { ...listItem }
                    }
                    return listItem;
                }),
                selectedList: action.payload,
                updateTaskSuccess: false,
                updateTaskFailed: false,
                updateTaskError: null
            };
        case actionTypes.UPDATE_TASK_TEXT_SUCCESS:
            return {
                ...state,
                updateTaskSuccess: true,
                updateTaskFailed: false,
                updateTaskError: null
            };
        case actionTypes.UPDATE_TASK_NAME_FAILED:
            return {
                ...state,
                updateTaskSuccess: false,
                updateTaskFailed: true,
                updateTaskError: action.payload
            };
        default:
            return state;
    }
}

export default list;