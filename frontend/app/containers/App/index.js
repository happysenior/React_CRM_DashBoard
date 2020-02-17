/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { Fragment } from 'react';
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';
import GlobalStyle from 'global-styles';

// Import Containers
import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import ForgotPasswordPage from 'containers/ForgotPasswordPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ProspectPage from 'containers/ProspectPage/Loadable';
// Import Components
import Header from 'components/App/Header';

export default function App() {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route path="/404" component={NotFoundPage} />
        <Route path="/prospects" component={ProspectPage} />
      </Switch>
      <GlobalStyle />
    </Fragment>
  );
}
