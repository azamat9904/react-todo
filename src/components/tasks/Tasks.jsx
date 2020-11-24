import React from 'react';
import Icon from '../icon/Icon';
import editSvg from '../../assets/img/edit.svg';
import checkSvg from '../../assets/img/check.svg';

import "./Tasks.scss";

const Tasks = () => {
    return (
        <div className="tasks">
            <h1 className="tasks__title">Фронтенд <Icon iconUrl={editSvg} /></h1>
            <div className="tasks__items">
                <div className="tasks__checkbox">
                    <input type="checkbox" id="check" />
                    <label htmlFor="check">
                        <Icon iconUrl={checkSvg} />
                    </label>
                </div>
                <p>ReactJs Hooks (useState, useReducer, useEffect и т.д.)</p>
            </div>
        </div>
    )
}

export default Tasks;