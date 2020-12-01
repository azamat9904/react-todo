import React, { useState, useEffect } from 'react';
import InputBase from '../components/input/Input';
import { connect } from 'react-redux';

import listActions from '../redux/actions/list';

const Input = ({
    task,
    updateTask,
    updateTaskNameSuccess
}) => {

    useEffect(() => {
        if (updateTaskNameSuccess) {
            setEditTextIsVisable(true);
        }

    }, [updateTaskNameSuccess]);

    const [inputText, setInputText] = useState(task.text);
    const [editTextIsVisable, setEditTextIsVisable] = useState(true);

    const taskTextEditedHandler = (e) => {
        if (e.keyCode === 13) {
            updateTask(task.listId, task.id, inputText);
        }
    };

    return (
        <InputBase
            inputText={inputText}
            setInputText={setInputText}
            editTextIsVisable={editTextIsVisable}
            setEditTextIsVisable={setEditTextIsVisable}
            taskTextEditedHandler={taskTextEditedHandler}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        updateTaskNameSuccess: state.listState.updateTaskSuccess
    }
}
export default connect(mapStateToProps, { ...listActions })(Input);