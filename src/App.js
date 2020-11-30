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
  fetchList,
  fetchColors
}) {

  // const [selectedListId, setSelectedListId] = useState(null);

  useEffect(() => {
    fetchList();
    fetchColors();
  }, [])


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
          // setSelectedListId={setSelectedListId}
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

// const mapStateToProps = (state) => {
//   return {
//     list: state.listState.list
//   }
// }

export default connect(null, { fetchList: listActions.fetchList, fetchColors: colorActions.fetchColors })(withRouter(App));
