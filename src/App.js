import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import listActions from './redux/actions/list';
import colorActions from './redux/actions/colors';

import './App.scss';
import List from './containers/List';
import AddList from './containers/AddList';
import Tasks from './containers/Tasks';
import { Route, Switch, Redirect } from 'react-router';

import listSvg from './assets/img/list.svg';
import Empty from './components/empty/Empty';
import list from './redux/actions/list';


const mainItem = [
  {
    id: 'ALL_TASKS',
    iconUrl: listSvg,
    name: "Все задачи",
  }
];


function App({
  list,
  fetchList,
  fetchColors,
  setSelectedListId,
  ...props
}) {

  useEffect(() => {
    fetchList();
    fetchColors();
  }, [])

  useEffect(() => {
    if (list.length !== 0) {
      const listId = +props.location.pathname.substr(1);
      const neededList = list.find((listItem) => listItem.id === listId);

      if (!neededList)
        props.history.push("/");
      else
        setSelectedListId(listId);
    }
  }, [list, props.location.pathname]);

  return (
    <div className="todo">
      <div className="sidebar">
        <AddList />
        <List isRemovable={true} />
      </div>
      <Switch>
        <Route
          exact
          path="/:id"
          render={(props) => <Tasks {...props}
          />}
        />
        <Route
          exact
          path="/"
          component={Empty}
        />
        <Route
          render={() => <Redirect to="/" />}
        />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    list: state.listState.list
  }
}

export default connect(mapStateToProps, { ...listActions, ...colorActions })(withRouter(App));
