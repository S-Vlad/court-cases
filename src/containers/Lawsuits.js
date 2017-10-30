import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as lawsuitActions from '../actions/ACT_lawsuitActions.js';
import AllLawsuitsPage from '../components/COM_allLawsuitsPage.js';
import CurrentLawsuitsPage from '../components/COM_currentLawsuitsPage.js';


class Lawsuits extends Component {
  render() {
    const { getLawsuits } = this.props.lawsuitActions,
          { lawsuits } = this.props;

    let template,
      ChildElement;

    if (this.props.location.pathname === '/lawsuits') {
      ChildElement = AllLawsuitsPage;
    } else  {
      ChildElement = CurrentLawsuitsPage;
    }

    template = (<ChildElement lawsuits={lawsuits} getLawsuits={getLawsuits} />);

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