import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as lawsuitActions from '../actions/ACT_lawsuitActions.js';
import AllLawsuitsPage from '../components/COM_allLawsuitsPage.js';
import OpenLawsuitsPage from '../components/COM_openLawsuitsPage.js';
import CurrentLawsuitPage from '../components/COM_currentLawsuitPage.js'


class Lawsuits extends Component {
  render() {
    const { getLawsuits, findLawsuits } = this.props.lawsuitActions,
          { lawsuits } = this.props;

    let template,
        ChildElement;

    if (this.props.location.pathname === '/lawsuits') {
      ChildElement = AllLawsuitsPage;
    } else if (this.props.location.pathname === '/open-lawsuits') {
      ChildElement = OpenLawsuitsPage;
    } else {
      ChildElement = CurrentLawsuitPage;
    }

    template = (<ChildElement lawsuits={lawsuits} getLawsuits={getLawsuits} findLawsuits={findLawsuits} location={this.props.match.params.lawsuit}/>);

    return(
      <main>
        {template}
      </main>
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
    lawsuitActions: bindActionCreators(lawsuitActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lawsuits);