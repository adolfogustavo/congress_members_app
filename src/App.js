import React from 'react';
import MembersContainer from './components/MembersContainer';
import MembersInfo from './components/MembersInfo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={MembersContainer} exact />
        <Route path="/:memberid" component={MembersInfo} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;