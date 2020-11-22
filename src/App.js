import React, { useState } from 'react';
import './App.scss';
import List from './components/list/List';
import AddList from './components/add-list/AddList';
import listSvg from './assets/img/list.svg';
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

  const onAddList = () => {
    if (!inputValue.trim()) {
      alert("Введите значене");
      return;
    }
    setList([...list, { id: list.length + 1, name: inputValue, colorId: selectedColor.id, color: selectedColor.name, active: false }]);
    setInputValue("");
    setIsVisable(false);
    setSelectedColor(DB.colors[0]);
  }

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          items={mainItem}
          isRemovable={false}
        />
        <List
          items={list}
          isRemovable={true}
        />
        <AddList
          isVisable={isVisable}
          setIsVisable={setIsVisable}
          colors={DB.colors}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          inputValue={inputValue}
          setInputValue={setInputValue}
          onAddList={onAddList}
        />
      </div>
      <div className="todo__tasks">

      </div>
    </div>
  );
}

export default App;
