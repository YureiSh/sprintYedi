import { Switch, Route, useLocation } from 'react-router-dom';

import Login from './components/Login';
import Success from './components/Success';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <div>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/success">
            <Success />
          </Route>
        </Switch>
      </div>
    </>
  );
}


export default App;
