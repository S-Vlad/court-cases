import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as participantActions from '../actions/ACT_participantActions.js';
import AllParticipantsPage from '../components/COM_allParticipantsPage.js';


class Participants extends Component {
  render() {
    const { participants } = this.props,
          { getParticipants, deleteParticipant, editParticipant, saveParticipants } = this.props.participantActions;

    return (
      <AllParticipantsPage participants={participants} getParticipants={getParticipants} deleteParticipant={deleteParticipant} editParticipant={editParticipant} saveParticipants={saveParticipants} />
    );
  }
}

function mapStateToProps(state) {
  return {
    participants: state.participants
  }
}

function mapDispatchToProps(dispatch) {
  return {
    participantActions: bindActionCreators(participantActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Participants)