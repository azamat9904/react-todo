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

import Empty from './components/empty/Empty';


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

      if (!neededList) {
        props.history.push("/");
        setSelectedListId(-1);
      }
      else
        setSelectedListId(listId);
    }
  }, [list, props.location.pathname]);

  return (
    <div className="todo">
      <div className="sidebar">
        <AddList />
        <List isRemovable={false} />
        <List isRemovable={true} />
      </div>
      <Switch>
        <Route
          exact
          path="/:id"
          render={(props) => <Tasks {...props} key={props.match.params.id} />}
        />
        <Route
          exact
          path="/"
          render={() => <Tasks showAll={true} />}
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
