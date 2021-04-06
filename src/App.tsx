import React from 'react';
import Container from '@material-ui/core/Container';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';

import { Home, Setting } from './views';
import { HOME, SETTING } from './constants/routes';

import './App.css';

function App() {
  return (
    <>
      <Container maxWidth="lg">
        <Router>
          <Route path={HOME} exact component={Home} />
          <Route path={SETTING} exact component={Setting} />
          <Route component={() => <Redirect to={HOME} />} />
        </Router>
      </Container>
    </>
  );
}

export default App;
