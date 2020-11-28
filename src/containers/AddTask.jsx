import React, { useState } from 'react';
import AddTaskBase from '../components/add-task/AddTask';
import { withRouter } from 'react-router-dom';
import { appApi } from '../services/api';

const AddTask = ({
    list,
    setListTasks,
    ...props
}) => {
    const [addBtnVisable, setAddBtnVisable] = useState(true);
    const [inputValue, setInputValue] = useState("");

    const addTaskHandler = () => {
        const listId = +props.location.pathname.substr(1);

        const task = {
            listId,
            text: inputValue,
            completed: false
        }

        if (inputValue.trim()) {
            return appApi.addTask(task).then(task => {
                setListTasks({ ...list, tasks: [...list.tasks, task] });
                setInputValue("");
                setAddBtnVisable(true);
            });
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

export default withRouter(AddTask);