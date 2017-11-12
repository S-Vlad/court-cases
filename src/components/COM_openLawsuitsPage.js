import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


export default class CurrentLawsuitsPage extends Component {
  componentDidMount() {
    this.props.getLawsuits(false);
  }

  render() {
    const props = this.props;
    let template = [];

    if (props.lawsuits.data) {
      const data = props.lawsuits.data;

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
            <td><Link to={`/current-lawsuit/${item.objectId}`}>{item.state}</Link></td>
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
    }

    return (
      <div>
        <h3>Текущие судебные дела</h3>
        <table className='table table-bordered lawsuit'>
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
}

CurrentLawsuitsPage.propTypes = {
  getLawsuits: PropTypes.func.isRequired,
};