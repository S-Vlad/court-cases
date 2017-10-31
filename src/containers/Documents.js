import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from '../actions/ACT_documentActions.js';
import AllDocumentsPage from '../components/COM_allDocumentsPage.js';
import CurrentDocumentPage from '../components/COM_currentDocumentPage.js';


class Documents extends Component {
  render() {
    const { getDocuments } = this.props.documentActions,
          { documents } = this.props;

    let template,
        ChildElement;

    if (this.props.location.pathname === '/documents' ||
        this.props.location.pathname === '/documents/') {
      ChildElement = AllDocumentsPage;
    } else {
      ChildElement = CurrentDocumentPage;
    }

    template = (<ChildElement documents={documents} getDocuments={getDocuments} location={this.props.match.params.document}/>);

    return(
      <main>
        {template}
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    documents: state.documents
  }
}

function mapDispatchToProps(dispatch) {
  return {
    documentActions: bindActionCreators(documentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Documents);