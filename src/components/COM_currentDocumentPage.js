import React, { Component } from 'react';


export default class CurrentDocumentsPage extends Component {
  componentDidMount() {
    this.props.getDocuments(this.props.location);
  }

  render() {
    const props = this.props,
          data = props.documents.data;

    let template = [];

    if (data && data.length > 0) {

      template = data.map((item, index) => {
        return(
          <div className='text-center' key={index}>
            <h4>{item.documents_id[0].name}</h4>
          </div>
        );
      });
    } else {
      template = (<h4>Такого документа нет</h4>);
    }

    if (data && data.length > 0) {
      return(
        <div>
          <h3>Документ</h3>
          {template}
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