import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as documentActions from '../actions/ACT_documentActions';
import AllDocumentsPage from '../components/COM_allDocumentsPage';


const mapStateToProps = state => ({ documents: state.documents });
const mapDispatchToProps = dispatch => ({
  documentActions: bindActionCreators(documentActions, dispatch),
});

class Documents extends Component {
  static propTypes = {
    documents: PropTypes.object.isRequired,
    documentActions: PropTypes.shape({
      addDocument: PropTypes.func.isRequired,
      deleteDocument: PropTypes.func.isRequired,
      editDocument: PropTypes.func.isRequired,
      editDocumentCancel: PropTypes.func.isRequired,
      getDocuments: PropTypes.func.isRequired,
      saveDocument: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    const { documents } = this.props;
    const {
      addDocument,
      deleteDocument,
      editDocument,
      editDocumentCancel,
      getDocuments,
      saveDocument,
    } = this.props.documentActions;

    const template = (
      <AllDocumentsPage
        documents={documents}
        addDocument={addDocument}
        deleteDocument={deleteDocument}
        editDocument={editDocument}
        editDocumentCancel={editDocumentCancel}
        getDocuments={getDocuments}
        saveDocument={saveDocument}
      />
    );

    return (
      <main>
        {template}
      </main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Documents);