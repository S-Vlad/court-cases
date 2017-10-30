import React, { Component } from 'react';


export default class AllDocumentsPage extends Component {
  componentDidMount() {
    this.props.getDocuments();
  }

  render() {
    const props = this.props;
    let template = [];

    if (props.documents.data) {
      const data = props.documents.data;

      template = data.map((item, index) => {
        return(
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.type}</td>
          </tr>
        );
      });
    }

    return(
      <div>
        <h3>Документы</h3>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Название</th>
              <th>Тип</th>
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