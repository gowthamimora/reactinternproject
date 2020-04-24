import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DescriptionPage from "./DescriptionPage";

import SearchCoursePage from "./SearchCoursePage";

function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route path="/about">
                    <h1>About page</h1>
                </Route>
                <Route path="/:id">
                    <DescriptionPage/>
                </Route>
                <Route path="/">
                    <SearchCoursePage/>
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;

