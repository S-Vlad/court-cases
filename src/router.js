import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import NotFoundPage from './components/COM_notFoundPage';
import Header from './components/COM_header';
import Lawsuits from './containers/Lawsuits';
import Documents from './containers/Documents';
import Participants from './containers/Participants';


export default (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path='/open-lawsuits' component={Lawsuits} />
        <Route path='/lawsuits' component={Lawsuits} />
        <Route path='/current-lawsuit/:lawsuit' component={Lawsuits} />
        <Route path='/documents' component={Documents} />
        <Route path='/participants' component={Participants} />
        <Redirect exact from='/' to='/open-lawsuits' />
        <Route path='*' component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);