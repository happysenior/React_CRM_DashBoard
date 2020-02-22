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
import ImportCSVPage from 'containers/ImportCSVPage/Loadable';
import ConversationPage from 'containers/ConversationPage/Loadable';

// Import Components
import Header from 'components/App/Header';

import AuthService from 'services/auth.service';

function PrivateRoute({ children, ...rest }) {
  const auth = new AuthService();
  const isLogged = auth.loggedIn();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogged ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default function App() {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route path="/404" component={NotFoundPage} />
        <PrivateRoute path="/prospects/import" component={ImportCSVPage} />

        <PrivateRoute path="/prospects" component={ProspectPage} />
        <PrivateRoute
          path="/conversations/:id"
          component={ConversationPage}
        ></PrivateRoute>
      </Switch>
      <GlobalStyle />
    </Fragment>
  );
}
