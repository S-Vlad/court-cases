import React, { Component } from 'react';


export default class CurrentDocumentsPage extends Component {
  componentDidMount() {
    this.props.getDocuments();
  }

  render() {
    return(
      <div></div>
    );
  }
}