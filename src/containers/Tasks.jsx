import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';

import TasksBase from '../components/tasks/Tasks';

import listActions from '../redux/actions/list';

const Tasks = ({
    list,
    changeStatus,
    updateList,
    updateListNameSuccess,
    removeListTask,
    allList,
    showAll
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
        const needToDelete = window.confirm("Вы уверены что хотите удалить ?");
        if (needToDelete) {
            removeListTask(id);
        }
    }

    return <Fragment>
        {
            showAll ? <div className="allTasks">
                {
                    allList.map((list) => (
                        <TasksBase
                            item={list}
                            checkedHandler={checkedHandler}
                            key={list.id}
                            showAll={showAll}
                        />
                    ))
                }
            </div> : <TasksBase
                    item={list}
                    isVisable={isVisable}
                    setIsVisable={setIsVisableHandler}
                    checkBoxValue={checkBoxValue}
                    setCheckBoxValue={setCheckBoxValue}
                    checkedHandler={checkedHandler}
                    removeListTask={removeTaskHandler}
                    saveTitle={saveTitle}
                    showAll={showAll}
                />
        }
    </Fragment>
}

const mapStateToProps = (state) => {
    return {
        list: state.listState.selectedList,
        allList: state.listState.list,
        updateListNameSuccess: state.listState.updateListNameSuccess
    }
}

export default connect(mapStateToProps, { ...listActions })(Tasks);