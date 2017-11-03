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

      template = data.map((itemTempl, index) => {

        let claimant,
            respondent,
            judge,
            participants = itemTempl.participants_id;

        participants.forEach((item) => {
          if (item.type === 'Истец') {
            claimant = item;
          } else if (item.type === 'Ответчик') {
            respondent = item;
          } else {
            judge = item;
          }
        });

        return(
          <tr key={index}>
            <td>{itemTempl.state}</td>
            <td>{claimant.name}</td>
            <td>{respondent.name}</td>
            <td>{itemTempl.type}</td>
            <td>{itemTempl.schedule_id[0].date_}</td>
            <td>{judge.name}</td>
            <td>{itemTempl.documents_id[0].name}</td>
          </tr>
        );
      });
    } else {
      template = (<h4>Такого документа нет</h4>);
    }

    if (data && data.length > 0) {
      return(
        <div>
          <h3>Текущие судебные дела</h3>
          <table className='table table-bordered'>
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
          <button type='button' className='btn btn-info'>Редактировать</button>
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