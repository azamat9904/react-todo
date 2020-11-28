import React, { Fragment } from 'react';
import addSvg from '../../assets/img/add.svg';
import Icon from '../icon/Icon';
import "./AddTask.scss";

const AddTask = ({
    addBtnVisable,
    setAddBtnVisable,
    inputValue,
    setInputValue,
    addTask
}) => {
    return (
        <Fragment>
            <div className="add-task">
                {
                    addBtnVisable ? <div className="add-task__option" onClick={() => setAddBtnVisable(false)}>
                        <div className="add-task__option-icon"> <Icon iconUrl={addSvg} /></div>
                        <h4 className="add-task__option-text">Новая задача</h4>
                    </div> : <div className="add-task__block">
                            <input
                                type="text"
                                className="add-task__input"
                                value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Текст задачи"
                            />
                            <div className="add-task__btn-group">
                                <button
                                    className="button"
                                    onClick={() => addTask()}
                                >Добавить задачу</button>
                                <button
                                    className="button add-task__btn"
                                    onClick={() => setAddBtnVisable(true)}
                                >Отменить</button>
                            </div>
                        </div>
                }
            </div>
        </Fragment>
    )
}

export default AddTask;