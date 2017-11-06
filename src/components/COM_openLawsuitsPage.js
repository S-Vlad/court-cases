import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class CurrentLawsuitsPage extends Component {
  componentDidMount() {
    this.props.getLawsuits(false);
  }

  render() {
    const props = this.props;
    let template = [];

    if (props.lawsuits.data) {
      const data = props.lawsuits.data;

      template = data.map((item, index) => {

        let claimant,
            respondent,
            judge,
            participants = item.participants_id;

        participants.forEach((itemParticipants) => {
          if (itemParticipants.type === 'Истец') {
            claimant = itemParticipants;
          } else if (itemParticipants.type === 'Ответчик') {
            respondent = itemParticipants;
          } else {
            judge = itemParticipants;
          }
        });

        return(
          <tr key={index}>
            <td><Link to={`/current-lawsuit/${item.objectId}`}>{item.state}</Link></td>
            <td>{claimant ? claimant.name : ''}</td>
            <td>{respondent ? respondent.name : ''}</td>
            <td>{judge ? judge.name : ''}</td>
            <td>{item.type}</td>
            <td>{item.schedule_id[0] ? item.schedule_id[0].date_ : ''}</td>
            <td>{item.documents_id[0] ? item.documents_id[0].name : ''}</td>
          </tr>
        )
      });
    }

    return(
      <div>
        <h3>Судебные дела</h3>
        <table className='table table-bordered lawsuit'>
          <thead>
            <tr>
              <th>Статус</th>
              <th>Истец</th>
              <th>Ответчик</th>
              <th>Судья</th>
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
