import React from 'react';
import AddTask from '../../containers/AddTask';
import Icon from '../icon/Icon';
import editSvg from '../../assets/img/edit.svg';
import checkSvg from '../../assets/img/check.svg';
import removeSvg from '../../assets/img/remove.svg';

import "./Tasks.scss";

const Tasks = ({
    item,
    isVisable,
    setIsVisable,
    checkBoxValue,
    setCheckBoxValue,
    saveTitle,
    checkedHandler,
    removeListTask
}) => {
    return (
        <div className="tasks">
            <input
                value={checkBoxValue}
                className="tasks__title-input"
                type={isVisable ? 'text' : 'hidden'}
                onChange={(e) => setCheckBoxValue(e.target.value)}
                onKeyUp={(e) => saveTitle(e)}
                autoFocus={true}
            />
            {
                !isVisable && <h1 className="tasks__title">{item && item.name}
                    <span onClick={setIsVisable}><Icon iconUrl={editSvg} /></span>
                </h1>
            }
            {
                item && item.tasks && item.tasks.map((task) => (
                    <div className="tasks__item" key={task.id}>
                        <div className="tasks__checkbox">
                            <input type="checkbox" id={`check${task.id}`} onChange={(e) => checkedHandler(task.id, e.target.checked)} checked={task.completed} />
                            <label htmlFor={`check${task.id}`}>
                                <Icon iconUrl={checkSvg} />
                            </label>
                        </div>
                        <p>{task.text}</p>
                        <div className="tasks__item-remove" onClick={() => removeListTask(task.id)}>
                            <Icon iconUrl={removeSvg} />
                        </div>
                    </div>
                ))
            }

            {
                item && item.tasks && item.tasks.length == 0 && <span className="empty-task">Добавьте новую задачу</span>
            }
            <AddTask />
        </div>
    )
}

export default Tasks;