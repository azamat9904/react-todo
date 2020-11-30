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
    ADD_TASK_TO_LIST: "ADD_TASK_TO_LIST",
    CHANGE_TASK_STATUS: "CHANGE_TASK_STATUS",
    UPDATE_LIST_NAME: "UPDATE_LIST_NAME",
    UPDATE_LIST_NAME_SUCCESS: "UPDATE_LIST_NAME_SUCCESS",
    UPDATE_LIST_NAME_FAILED: "UPDATE_LIST_NAME_FAILED",
    ADD_NEW_TASK: "ADD_NEW_TASK",
    ADD_NEW_TASK_SUCCESS: "ADD_NEW_TASK_SUCCESS",
    ADD_NEW_TASK_FAILED: "ADD_NEW_TASK_FAILED"
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

const addTaskToList = (task) => ({
    type: actionTypes.ADD_TASK_TO_LIST,
    payload: task
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
    },
    addTaskToList: (task) => (dispatch) => {
        appApi.addTask(task).then(task => {
            dispatch(addTaskToList(task));
            // setListTasks({ ...list, tasks: [...list.tasks, task] });

        });
    },
    changeStatus: (taskId, status) => (dispatch, getState) => {
        appApi.checkTask(taskId, status).then(() => {
            const list = getState().listState.list;
            const selectedListId = getState().listState.selectedListId;
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
    }
}

