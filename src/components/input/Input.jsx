import React from 'react';

import "./Input.scss";

const Input = ({
    inputText,
    setInputText,
    editTextIsVisable,
    setEditTextIsVisable,
    taskTextEditedHandler
}) => {
    return (
        <>
            {
                editTextIsVisable ? <p
                    onDoubleClick={() => setEditTextIsVisable(false)}
                >{inputText}</p> : <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="edit-task-input"
                        onBlur={() => setEditTextIsVisable(true)}
                        onKeyDown={(e) => taskTextEditedHandler(e)}
                    />
            }
        </>
    )
}

export default Input;