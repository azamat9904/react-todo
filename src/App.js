import React, { useState } from 'react';
import './App.scss';
import List from './components/list/List';
import AddList from './components/add-list/AddList';
import listSvg from './assets/img/list.svg';
import DB from './assets/db.json';

const mainItem = [
  {
    iconUrl: listSvg,
    text: "Все задачи",
    active: false
  }
];

const items = [
  {
    color: 'green',
    text: 'Покупки',
    active: false
  },
  {
    color: 'blue',
    text: 'Фронтенд',
    active: false
  },
  {
    color: 'pink',
    text: 'Фильмы и Сериалы',
    active: true
  }
];


function App() {
  const [isVisable, setIsVisable] = useState(false);
  const [selectedColor, setSelectedColor] = useState(DB.colors[0]);

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          items={mainItem}
          isRemovable={false}
        />
        <List
          items={items}
          isRemovable={true}
        />
        <AddList
          isVisable={isVisable}
          setIsVisable={setIsVisable}
          colors={DB.colors}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      </div>
      <div className="todo__tasks">

      </div>
    </div>
  );
}

export default App;
