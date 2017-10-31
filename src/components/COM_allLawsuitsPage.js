import React, { Component } from 'react';


export default class AllLawsuitsPage extends Component {
  componentDidMount() {
    this.props.getLawsuits(true);
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
            <td>{claimant.name}</td>
            <td>{respondent.name}</td>
            <td>{judge.name}</td>
            <td>{item.state}</td>
            <td>{item.documents_id[0].name}</td>
          </tr>
        );
      });
    }

    return(
      <div>
        <h3>Текущие судебные дела</h3>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Истец</th>
              <th>Ответчик</th>
              <th>Судья</th>
              <th>Статус</th>
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