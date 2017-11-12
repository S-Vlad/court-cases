import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';


import * as lawsuitActions from '../actions/ACT_lawsuitActions';
import AllLawsuitsPage from '../components/COM_allLawsuitsPage';
import OpenLawsuitsPage from '../components/COM_openLawsuitsPage';
import CurrentLawsuitPage from '../components/COM_currentLawsuitPage';


const mapStateToProps = state => ({ lawsuits: state.lawsuits });
const mapDispatchToProps = dispatch => ({
  lawsuitActions: bindActionCreators(lawsuitActions, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Lawsuits extends Component {
  render() {
    const { getLawsuits, findLawsuits } = this.props.lawsuitActions,
          { lawsuits } = this.props;

    let ChildElement;

    if (this.props.location.pathname === '/lawsuits') {
      ChildElement = AllLawsuitsPage;
    } else if (this.props.location.pathname === '/open-lawsuits') {
      ChildElement = OpenLawsuitsPage;
    } else {
      ChildElement = CurrentLawsuitPage;
    }

    const template = (
      <ChildElement
        lawsuits={lawsuits}
        location={this.props.match.params.lawsuit}
        findLawsuits={findLawsuits}
        getLawsuits={getLawsuits}
      />
    );

    return (
      <main>
        {template}
      </main>
    );
  }
}

Lawsuits.propTypes = {
  lawsuits: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      lawsuit: PropTypes.string.isRequired,
    }),
  }).isRequired,
  lawsuitActions: PropTypes.shape({
    getLawsuits: PropTypes.func.isRequired,
    findLawsuits: PropTypes.func.isRequired,
  }).isRequired,
};