import React, { useEffect, useState, Fragment } from 'react';
import TasksBase from '../components/tasks/Tasks';
import Loader from '../components/loading/Loading';
import { connect } from 'react-redux';
import listActions from '../redux/actions/list';

const Tasks = ({
    setSelectedListId,
    list,
    changeStatus,
    updateList,
    updateListNameSuccess,
    removeListTask,
    ...props
}) => {

    const [isVisable, setIsVisable] = useState(false);
    const [checkBoxValue, setCheckBoxValue] = useState('');

    useEffect(() => {
        if (list && list.name)
            setCheckBoxValue(list.name);

        if (updateListNameSuccess) {
            setIsVisable(false);
        }

    }, [list, updateListNameSuccess]);

    const setIsVisableHandler = () => {
        setIsVisable(!isVisable);
    };


    const checkedHandler = (taskId, status) => {
        changeStatus(taskId, status);
    }

    const saveTitle = (e) => {
        if (e.keyCode === 13) {
            updateList(list.id, checkBoxValue);
        }
    }

    const removeTaskHandler = (id) => {
        const needToDelete = confirm("Вы уверены что хотите удалить ?");
        if (needToDelete) {
            removeListTask(id);
        }
    }

    return <Fragment>
        <TasksBase
            item={list}
            isVisable={isVisable}
            setIsVisable={setIsVisableHandler}
            checkBoxValue={checkBoxValue}
            setCheckBoxValue={setCheckBoxValue}
            checkedHandler={checkedHandler}
            removeListTask={removeTaskHandler}
            saveTitle={saveTitle}
        />
    </Fragment>
}

const mapStateToProps = (state) => {
    return {
        list: state.listState.selectedList,
        updateListNameSuccess: state.listState.updateListNameSuccess
    }
}

export default connect(mapStateToProps, { ...listActions })(Tasks);