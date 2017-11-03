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
            <td><Link to={`/current-lawsuit/${itemTempl.objectId}`}>{itemTempl.state}</Link></td>
            <td>{claimant.name}</td>
            <td>{respondent.name}</td>
            <td>{judge.name}</td>
            <td>{itemTempl.documents_id[0].name}</td>
          </tr>
        )
      });
    }

    return(
      <div>
        <h3>Судебные дела</h3>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Статус</th>
              <th>Истец</th>
              <th>Ответчик</th>
              <th>Судья</th>
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
