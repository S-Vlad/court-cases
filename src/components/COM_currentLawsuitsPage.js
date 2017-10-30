import React, { Component } from 'react';


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
        return(
          <tr key={index}>
            <td>{item.claimant}</td>
            <td>{item.respondent}</td>
            <td>{item.state}</td>
            <td>{item.document_id}</td>
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
              <th>Истец</th>
              <th>Ответчик</th>
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
