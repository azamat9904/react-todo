import React, { useState, useEffect } from 'react';
import { appApi } from './services/api';

import './App.scss';
import List from './containers/List';
import AddList from './containers/AddList';
import Tasks from './components/tasks/Tasks';

import listSvg from './assets/img/list.svg';


const mainItem = [
  {
    iconUrl: listSvg,
    name: "Все задачи",
    active: false
  }
];


function App() {

  const [list, setList] = useState([]);
  const [colors, setColors] = useState([])

  useEffect(() => {
    appApi.getList().then((list) => {
      list.forEach((item) => {
        item.color = item.color.name;
      });
      setList(list);
    });
  }, [])

  useEffect(() => {
    appApi.getColors().then((colors) => {
      setColors(colors);
    });
  }, [])



  return (
    <div className="todo">
      <div className="sidebar">
        <AddList
          colors={colors}
          list={list}
          setList={setList}
        />

        <List
          list={mainItem}
          isRemovable={false}
        />
        <List
          list={list}
          isRemovable={true}
          setList={setList}
        />
      </div>
      <Tasks />
    </div>
  );
}

export default App;
