import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { appApi } from './services/api';

import './App.scss';
import List from './containers/List';
import AddList from './containers/AddList';
import Tasks from './containers/Tasks';
import { Route, Switch, Redirect } from 'react-router';

import listSvg from './assets/img/list.svg';
import Empty from './components/empty/Empty';


const mainItem = [
  {
    id: 'ALL_TASKS',
    iconUrl: listSvg,
    name: "Все задачи",
  }
];


function App(props) {

  const [list, setList] = useState([]);
  const [colors, setColors] = useState([])
  const [selectedListId, setSelectedListId] = useState(null);

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
          selectedListId={selectedListId}
          setSelectedListId={setSelectedListId}
        />
        <List
          list={list}
          isRemovable={true}
          setList={setList}
          selectedListId={selectedListId}
          setSelectedListId={setSelectedListId}
        />
      </div>
      <Switch>
        <Route exact path="/:id" render={(props) => <Tasks {...props} setSelectedListId={setSelectedListId} />} />
        <Route exact path="/" component={Empty} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
