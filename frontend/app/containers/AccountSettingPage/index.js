import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from 'components/App/Header';
import AccountSetting from './AccountSetting';
import GetNumber from './GetNumber';

export default function AccountSettingPage(props) {
  return (
    <Fragment>
      <Header />
      <div>
        <Switch>
          <Route path="/preferences/general" component={AccountSetting} />
          <Route path="/preferences/getnumber" component={GetNumber} />

          <Route render={() => <Redirect to="/404" />} />
        </Switch>
      </div>
    </Fragment>
  );
}
