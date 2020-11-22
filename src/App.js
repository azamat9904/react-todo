import React, { useState } from 'react';
import './App.scss';
import List from './components/list/List';
import AddList from './components/add-list/AddList';
import Icon from './components/icon/Icon';

import listSvg from './assets/img/list.svg';
import editSvg from './assets/img/edit.svg';
import checkSvg from './assets/img/check.svg';

import DB from './assets/db.json';

const mainItem = [
  {
    iconUrl: listSvg,
    name: "Все задачи",
    active: false
  }
];


function App() {

  const [isVisable, setIsVisable] = useState(false);
  const [selectedColor, setSelectedColor] = useState(DB.colors[0]);
  const [inputValue, setInputValue] = useState('');
  const [list, setList] = useState(DB.lists.map((item) => {
    item.color = DB.colors.find((color) => color.id === item.colorId).name;
    return item;
  }));

  const onClose = () => {
    setInputValue("");
    setIsVisable(false);
    setSelectedColor(DB.colors[0]);
  }

  const onAddList = () => {
    if (!inputValue.trim()) {
      alert("Введите значене");
      return;
    }
    setList([...list, { id: list.length + 1, name: inputValue, colorId: selectedColor.id, color: selectedColor.name, active: false }]);
    onClose();
  }

  const onRemoveList = (item) => {
    const definetelyDelete = window.confirm("Are you really want to delete item ? ");
    if (definetelyDelete)
      console.log(item);
  }

  const visableHandler = (isVisable) => {
    if (!isVisable) {
      onClose();
      return;
    }
    setIsVisable(true);
  }

  return (
    <div className="todo">
      <div className="sidebar">
        <List
          items={mainItem}
          isRemovable={false}
        />
        <List
          items={list}
          isRemovable={true}
          onRemove={onRemoveList}
        />
        <AddList
          isVisable={isVisable}
          setIsVisable={visableHandler}
          colors={DB.colors}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          inputValue={inputValue}
          setInputValue={setInputValue}
          onAddList={onAddList}
        />
      </div>
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
    </div>
  );
}

export default App;
