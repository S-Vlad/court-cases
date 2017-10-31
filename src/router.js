import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NotFoundPage from './components/COM_notFoundPage.js';
import Header from './components/COM_header.js';
import Lawsuits from './containers/Lawsuits.js';
import Documents from './containers/Documents.js';


export default (
  <BrowserRouter>
    <div>
      <Header/>
      <Switch>
        <Route path='/current-lawsuits' component={Lawsuits} />
        <Route path='/lawsuits' component={Lawsuits} />
        <Route exact path='/documents' component={Documents} />
        <Route exact path='/documents/:document' component={Documents} />
        <Redirect exact from='/' to='/current-lawsuits' /> {/*перенаправление на нужную страницу*/}
        <Route path='*' component={NotFoundPage}/>
      </Switch>
    </div>
  </BrowserRouter>
);