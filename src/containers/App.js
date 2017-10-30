import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as lawsuitsActions from '../actions/ACT_lawsuitsActions.js';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AllLawsuitsPage from '../components/COM_allLawsuitsPage.js';
import NotFoundPage from '../components/COM_notFoundPage.js';
import Header from '../components/COM_header.js';
import CurrentLawsuitsPage from '../components/COM_currentLawsuitsPage.js';


class App extends Component {
  render() {
    const { getLawsuits } = this.props.lawsuitsActions;
    const { lawsuits } = this.props;

    return (
      <div className='App container'>
        <BrowserRouter>
        <div>
          <Header/>
          <Switch>
            <Route path='/current-lawsuits' render={ () => (<AllLawsuitsPage lawsuits={lawsuits} getLawsuits={getLawsuits} />)} />
            <Route path='/lawsuits' render={ () => (<CurrentLawsuitsPage lawsuits={lawsuits} getLawsuits={getLawsuits} />)} />
            <Redirect from='/' to='/current-lawsuits' /> {/*перенаправление на нужную страницу*/}
            <Route path='*' component={NotFoundPage}/>
          </Switch>
        </div>
      </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    lawsuits: state.lawsuits
  }
}

function mapDispatchToProps(dispatch) {
  return {
    lawsuitsActions: bindActionCreators(lawsuitsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
