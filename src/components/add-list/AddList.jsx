import React from 'react';

import List from '../list/List';
import Badge from '../badge/Badge';
import Icon from '../icon/Icon';

import addSvg from '../../assets/img/add.svg';
import closeUrl from '../../assets/img/close.svg';

import "./AddList.scss";

const editItem = [
    {
        iconUrl: addSvg,
        name: "Добавить задачу",
        active: false
    }
];

const AddList = ({
    isVisable,
    setIsVisable,
    colors,
    selectedColor,
    setSelectedColor,
    inputValue,
    setInputValue,
    onAddList,
    isLoading
}) => {

    return (
        <div className="add-list">
            <List
                items={editItem}
                isRemovable={false}
                onClick={() => setIsVisable(true)}
            />
            {
                isVisable && <div className="add-list__popup">
                    <div className="add-list__close">
                        <Icon
                            iconUrl={closeUrl}
                            alt={'Close button'}
                            click={() => setIsVisable(false)}
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Название списка"
                        className="field"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <div className="add-list__colors">
                        {
                            colors.map(color => (<Badge
                                color={color.name}
                                key={color.id}
                                click={() => setSelectedColor(color)}
                                active={selectedColor.id === color.id}
                            />))
                        }
                    </div>
                    <button
                        className="button"
                        onClick={onAddList}
                    >
                        {
                            isLoading ? "Добавление..." : " Добавить список"
                        }
                    </button>
                </div>
            }
        </div>
    )
}

export default AddList;