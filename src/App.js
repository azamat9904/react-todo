import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.scss';
import List from './components/list/List';
import AddList from './components/add-list/AddList';
import Tasks from './components/tasks/Tasks';

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
  const [list, setList] = useState([]);
  const [colors, setColors] = useState([])
  const [isLoadingOnAdd, setIsLoadingOnAdd] = useState(false);
  const [isLoadingOnRemove, setIsLoadingOnRemove] = useState(false);

  useEffect(() => {
    console.log('called');
    axios.get('http://localhost:3001/lists?_expand=color').then(({ data }) => {
      data.forEach((item) => {
        item.color = item.color.name;
      });
      setList(data);
    });
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3001/colors').then(({ data }) => {
      setColors(data);
      setSelectedColor(data[0]);
    });
  }, [])

  const onClose = () => {
    setInputValue("");
    setIsVisable(false);
    setSelectedColor(colors[0]);
  }

  const onAddList = () => {
    if (!inputValue.trim()) {
      alert("Введите значене");
      return;
    }
    const newListItem = { name: inputValue, colorId: selectedColor.id, active: false }
    setIsLoadingOnAdd(true);
    axios.post('http://localhost:3001/lists', newListItem)
      .then(({ data }) => {
        data.color = colors.find((color) => color.id === data.colorId).name;
        const newList = [...list, data];
        setList(newList);
        onClose();
      }).finally(() => {
        setIsLoadingOnAdd(false);
      });
  }

  const onRemoveList = (item) => {
    const definetelyDelete = window.confirm("Are you really want to delete item ? ");
    if (definetelyDelete) {
      setIsLoadingOnRemove(true);
      axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
        const l = list.filter((listItem) => listItem !== item.id);
        setList(l);
      }).finally(() => {
        setIsLoadingOnRemove(false);
      });
    }
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
        <AddList
          isVisable={isVisable}
          setIsVisable={visableHandler}
          colors={colors}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          inputValue={inputValue}
          setInputValue={setInputValue}
          onAddList={onAddList}
          isLoading={isLoadingOnAdd}
        />

        <List
          items={mainItem}
          isRemovable={false}
        />
        <List
          items={list}
          isRemovable={true}
          onRemove={onRemoveList}
          isLoading={isLoadingOnRemove}
        />
      </div>
      <Tasks />
    </div>
  );
}

export default App;
