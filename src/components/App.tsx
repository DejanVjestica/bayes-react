import './App.scss';
import React, { FC } from 'react';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import Example from './Example';
import Login from './Login';
import Matches from './Matches';
import AddMatch from './AddMatch';

import { useDispatch, useSelector, actions } from '../store';

const App: FC = () => {
  const { matches } = useSelector((state) => state);
  const { isLogedIn } = useSelector((state) => state);
  // if (Object.keys(matches).length !== 0) console.log("matches object",matches);

  return (
    <div className="App">
      <header>
        <h1>Bayes E-sport Solutions</h1>
        <NavLink exact to="/">
          Home
        </NavLink>
        {!isLogedIn && <Redirect to="/" />}
        {!isLogedIn && (
          <NavLink exact to="/">
            <Login />
          </NavLink>
        )}
        {isLogedIn && (
          <NavLink exact to="/matches">
            Matches
          </NavLink>
        )}
        {isLogedIn && (
          <NavLink exact to="/matches">
            <AddMatch />
          </NavLink>
        )}
      </header>
      <main>
        <Switch>
          {/* {Object.keys(matches).length !== 0 ? <Redirect from="/" to="/matches" /> : <Redirect from="/" to="/" />} */}
          {/* {!isLogedIn && <Redirect to="/" />} */}

          <Route exact path="/matches">
            <br />
            <br />
            <Matches />
            <br />
          </Route>

          <Route path="/">
            Welcome to the Bayes Frontend Challenge.
            <br />
            The README file explains the tasks we would like you to complete.
            <br />
            <br />
            Here is an example of a request and a modal:
            <Example />
            <br />
            <br />
            Good Luck!
            <br />
            The Bayes E-Sports Team
          </Route>
        </Switch>
        <br />
        <br />
      </main>
    </div>
  );
};

export default App;
