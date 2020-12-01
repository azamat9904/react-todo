import { appApi } from '../../services/api';

export const actionTypes = {
    SET_LIST: "SET_LIST",
    ADD_LIST: "ADD_LIST",
    ADD_LIST_SUCCESS: "ADD_LIST_SUCCESS",
    ADD_LIST_FAILED: "ADD_LIST_FAILED",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LOADING: "SET_LOADING",
    SET_SELECTED_LIST_ID: "SET_SELECTED_LIST_ID",
    REMOVE_LIST: "REMOVE_LIST",
    CHANGE_TASK_STATUS: "CHANGE_TASK_STATUS",
    UPDATE_LIST_NAME: "UPDATE_LIST_NAME",
    UPDATE_LIST_NAME_SUCCESS: "UPDATE_LIST_NAME_SUCCESS",
    UPDATE_LIST_NAME_FAILED: "UPDATE_LIST_NAME_FAILED",
    ADD_NEW_TASK: "ADD_NEW_TASK",
    ADD_NEW_TASK_SUCCESS: "ADD_NEW_TASK_SUCCESS",
    ADD_NEW_TASK_FAILED: "ADD_NEW_TASK_FAILED",
    REMOVE_TASK: "REMOVE_TASK",
    UPDATE_TASK_TEXT: "UPDATE_TASK_TEXT",
    UPDATE_TASK_TEXT_SUCCESS: "UPDATE_TASK_TEXT_SUCCESS",
    UPDATE_TASK_TEXT_FAILED: "UPDATE_TASK_TEXT_FAILED"
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


const changeTaskStatus = (selectedList) => ({
    type: actionTypes.CHANGE_TASK_STATUS,
    payload: selectedList
});

const updateListName = (name) => ({
    type: actionTypes.UPDATE_LIST_NAME,
    payload: name
});

const updateListNameSuccess = () => ({
    type: actionTypes.UPDATE_LIST_NAME_SUCCESS
});

const updateListNameFailed = (error) => ({
    type: actionTypes.UPDATE_LIST_NAME_FAILED,
    payload: error
});


const addNewTask = (list) => ({
    type: actionTypes.ADD_NEW_TASK,
    payload: list
});

const addNewTaskSuccess = (list) => ({
    type: actionTypes.ADD_NEW_TASK_SUCCESS,
    payload: list
});

const addNewTaskFailed = (error) => ({
    type: actionTypes.ADD_NEW_TASK_FAILED,
    payload: error
});

const removeTask = (list) => ({
    type: actionTypes.REMOVE_TASK,
    payload: list
});

const updateTaskText = (list) => ({
    type: actionTypes.UPDATE_TASK_TEXT,
    payload: list
});

const updateTaskTextSuccess = () => ({
    type: actionTypes.UPDATE_TASK_TEXT_SUCCESS
});

const updateTaskTextFailed = (error) => ({
    type: actionTypes.UPDATE_TASK_TEXT_FAILED,
    payload: error
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
            item.tasks = [];
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
    },
    changeStatus: (listId, taskId, status) => (dispatch, getState) => {
        appApi.checkTask(taskId, status).then(() => {
            const list = getState().listState.list;
            const selectedListId = listId;
            let selectedList = list.find((listItem) => listItem.id === selectedListId);
            selectedList = {
                ...selectedList, tasks: selectedList.tasks.filter((task) => {
                    if (task.id === taskId) {
                        task.completed = status;
                        return task;
                    }
                    return task;
                })
            };
            dispatch(changeTaskStatus(selectedList));
        });
    },
    updateList: (id, name) => (dispatch) => {
        appApi.updateList(id, name).then(() => {
            dispatch(updateListName(name));
            dispatch(updateListNameSuccess());
        }).catch(() => {
            dispatch(updateListNameFailed());
        });
    },
    addNewTask: (list, task) => (dispatch) => {
        appApi.addTask(task).then(task => {
            dispatch(addNewTask({ ...list, tasks: [...list.tasks, task] }));
            dispatch(addNewTaskSuccess());
        }).catch((e) => {
            console.log('error', e);
            dispatch(addNewTaskFailed(e.response));
        });
    },
    removeListTask: (taskId) => (dispatch, getState) => {
        appApi.deleteTask(taskId).then(() => {
            const list = getState().listState.list;
            const selectedListId = getState().listState.selectedListId;
            let selectedList = list.find((listItem) => listItem.id === selectedListId);
            selectedList = {
                ...selectedList, tasks: selectedList.tasks.filter((task) => task.id !== taskId)
            };
            dispatch(removeTask(selectedList));
        });
    },
    updateTask: (listId, taskId, text) => (dispatch, getState) => {
        appApi.updateTaskText(taskId, text).then((updatedTask) => {
            const list = getState().listState.list;
            const selectedListId = listId;
            let selectedList = list.find((listItem) => listItem.id === selectedListId);
            selectedList = {
                ...selectedList, tasks: selectedList.tasks.filter((task) => {
                    if (task.id === taskId) {
                        task.text = text;
                        return task;
                    }
                    return task;
                })
            };
            dispatch(updateTaskText(selectedList));
            dispatch(updateTaskTextSuccess());
        }).catch((e) => {
            dispatch(updateTaskTextFailed(e.response));
        });
    }
}

