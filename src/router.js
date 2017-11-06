import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NotFoundPage from './components/COM_notFoundPage.js';
import Header from './components/COM_header.js';
import Lawsuits from './containers/Lawsuits.js';
import Documents from './containers/Documents.js';
import Participants from './containers/Participants.js';


export default (
  <BrowserRouter>
    <div>
      <Header/>
      <Switch>
        <Route path='/open-lawsuits' component={Lawsuits} />
        <Route path='/lawsuits' component={Lawsuits} />
        <Route path='/current-lawsuit/:lawsuit' component={Lawsuits}/>
        <Route path='/documents' component={Documents} />
        <Route path='/participants' component={Participants} />
        <Redirect exact from='/' to='/open-lawsuits' /> {/*перенаправление на нужную страницу*/}
        <Route path='*' component={NotFoundPage}/>
      </Switch>
    </div>
  </BrowserRouter>
);