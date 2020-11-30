import React, { useState, useEffect } from 'react';
import AddTaskBase from '../components/add-task/AddTask';
import { withRouter } from 'react-router-dom';
import { appApi } from '../services/api';
import { connect } from 'react-redux';
import listActions from '../redux/actions/list';
import list from '../redux/actions/list';

const AddTask = ({
    list,
    addNewTask,
    addNewTaskSuccess,
    ...props
}) => {
    const [addBtnVisable, setAddBtnVisable] = useState(true);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {

        if (addNewTaskSuccess) {
            setInputValue("");
            setAddBtnVisable(true);
        }

    }, [addNewTaskSuccess])

    const addTaskHandler = () => {
        const listId = +props.location.pathname.substr(1);

        const task = {
            listId,
            text: inputValue,
            completed: false
        }

        if (inputValue.trim()) {
            addNewTask(list, task);
            return;
        }

        alert("Введите данные");
    }

    return (
        <AddTaskBase
            addBtnVisable={addBtnVisable}
            setAddBtnVisable={setAddBtnVisable}
            inputValue={inputValue}
            setInputValue={setInputValue}
            addTask={addTaskHandler}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        list: state.listState.selectedList,
        addNewTaskSuccess: state.listState.addNewTaskSuccess
    }
}

export default connect(mapStateToProps, { ...listActions })(withRouter(AddTask));