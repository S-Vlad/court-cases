import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as participantActions from '../actions/ACT_participantActions';
import AllParticipantsPage from '../components/COM_allParticipantsPage';


const mapStateToProps = state => ({ participants: state.participants });
const mapDispatchToProps = dispatch => ({
  participantActions: bindActionCreators(participantActions, dispatch),

});

@connect(mapStateToProps, mapDispatchToProps)
export default class Participants extends Component {
  static propTypes = {
    participants: PropTypes.object.isRequired,
    participantActions: PropTypes.shape({
      addParticipant: PropTypes.func.isRequired,
      deleteParticipant: PropTypes.func.isRequired,
      editParticipant: PropTypes.func.isRequired,
      editParticipantCancel: PropTypes.func.isRequired,
      getParticipants: PropTypes.func.isRequired,
      saveParticipant: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    const { participants } = this.props,
          {
            getParticipants, deleteParticipant, addParticipant,
            editParticipant, editParticipantCancel, saveParticipant,
          } = this.props.participantActions;

    return (
      <AllParticipantsPage
        participants={participants}
        addParticipant={addParticipant}
        deleteParticipant={deleteParticipant}
        editParticipant={editParticipant}
        editParticipantCancel={editParticipantCancel}
        getParticipants={getParticipants}
        saveParticipant={saveParticipant}
      />
    );
  }
}