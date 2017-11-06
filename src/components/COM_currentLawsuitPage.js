import React, { Component } from 'react';


export default class CurrentLawsuitPage extends Component {
  componentDidMount() {
    this.props.getLawsuits(true, this.props.location);
  }

  render() {
    const props = this.props,
          data = props.lawsuits.data;

    let template = [];

    if (data && data.length > 0) {

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
            <td>{item.state}</td>
            <td>{claimant.name ? claimant.name : ''}</td>
            <td>{respondent.name ? respondent.name : ''}</td>
            <td>{judge.name ? judge.name : ''}</td>
            <td>{item.type}</td>
            <td>{item.schedule_id[0] ? item.schedule_id[0].date_ : ''}</td>
            <td>{item.documents_id[0] ? item.documents_id[0].name : ''}</td>
          </tr>
        );
      });
    } else {
      template = (<h4>Такого документа нет</h4>);
    }

    if (data && data.length > 0) {
      return(
        <div>
          <h3>Судебное дело</h3>
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
    } else {
      return (
        <div>
          {template}
        </div>
      );
    }
  }
}