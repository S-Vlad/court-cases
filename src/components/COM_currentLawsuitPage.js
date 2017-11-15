import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class CurrentLawsuitPage extends Component {
  static propTypes = {
    location: PropTypes.string.isRequired,
    getLawsuits: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getLawsuits(true, this.props.location);
  }

  render() {
    const props = this.props,
          data = props.lawsuits.data || [];

    let template = [];

    template = data.map((item) => {
      let claimant,
          respondent,
          judge;

      const participants = item.participants_id;

      participants.forEach((itemParticipants) => {
        if (itemParticipants.type === 'Истец') {
          claimant = itemParticipants;
        } else if (itemParticipants.type === 'Ответчик') {
          respondent = itemParticipants;
        } else {
          judge = itemParticipants;
        }
      });

      return (
        <tr key={item.objectId}>
          <td>{item.state}</td>
          <td>
            <p><span>Истец:</span> {claimant ? claimant.name : ''}</p>
            <p><span>Ответчик:</span> {respondent ? respondent.name : ''}</p>
            <p><span>Судья:</span> {judge ? judge.name : ''}</p>
          </td>
          <td>{item.type}</td>
          <td>{item.schedule_id[0] ? item.schedule_id[0].date_ : ''}</td>
          <td>{item.documents_id[0] ? item.documents_id[0].name : ''}</td>
        </tr>
      );
    });

    if (data && data.length > 0) {
      return (
        <div>
          <h3>Судебное дело</h3>
          <table className='table table-bordered table-responsive lawsuit'>
            <thead>
              <tr>
                <th>Статус</th>
                <th>Стороны</th>
                <th>Тип</th>
                <th>Дата</th>
                <th>Статья</th>
              </tr>
            </thead>
            <tbody>
              {template}
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <div>
        {template}
      </div>
    );
  }
}