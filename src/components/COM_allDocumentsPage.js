import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class AllDocumentsPage extends Component {
  static propTypes = {
    documents: PropTypes.shape({
      data: PropTypes.array.isRequired,
      edit: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
      ]).isRequired,
    }).isRequired,
    addDocument: PropTypes.func.isRequired,
    deleteDocument: PropTypes.func.isRequired,
    editDocument: PropTypes.func.isRequired,
    editDocumentCancel: PropTypes.func.isRequired,
    getDocuments: PropTypes.func.isRequired,
    saveDocument: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getDocuments();
  }

  addButtonHandler = () => {
    const refs = {
      addDocumentName: this.addDocumentName,
      addDocumentType: this.addDocumentType,
    };

    const nameField = refs.addDocumentName;

    if (nameField.value) {
      this.props.addDocument(refs);
      nameField.value = '';
    } else {
      alert('Введите название документа');
    }
  }

  editClickHandler(documentId) {
    this.props.editDocument(documentId);
  }

  saveButtonHandler(documentId) {
    const refs = {
      documentName: this.documentName.value,
      documentType: this.documentType.value,
    };

    this.props.documents.data.forEach((item) => {
      if (item.objectId === documentId) {
        if (item.name !== refs.documentName ||
            item.type !== refs.documentType) {
          this.props.saveDocument(documentId, refs);
        } else {
          this.props.editDocumentCancel();
        }
      }
    });
  }

  deleteButtonHandler(documentId) {
    this.props.deleteDocument(documentId);
  }

  render() {
    const props = this.props;
    const data = props.documents.data || [];

    let template = [];

    template = data.map((item) => {
      if (this.props.documents.edit === item.objectId) {
        return (
          <tr key={item.objectId}>
            <td>
              <textarea
                ref={(textarea) => { this.documentName = textarea; }}
                className='form-control'
                defaultValue={item.name}
                rows='1'
              />
            </td>
            <td>
              <select
                defaultValue={item.type}
                ref={(select) => { this.documentType = select; }}
                className='form-control'>
                <option>Закон</option>
                <option>Постановление</option>
              </select>
            </td>
            <td className='text-center'>
              <button
                onClick={this.saveButtonHandler.bind(this, item.objectId)}
                type='button'
                className='btn btn-success'>
                Сохранить
              </button>
            </td>
          </tr>
        );
      }

      return (
        <tr key={item.objectId}>
          <td onDoubleClick={this.editClickHandler.bind(this, item.objectId)}>
            {item.name}
          </td>
          <td onDoubleClick={this.editClickHandler.bind(this, item.objectId)}>
            {item.type}
          </td>
          <td className='text-center'>
            <button
              onClick={this.deleteButtonHandler.bind(this, item.objectId)}
              type='button'
              className='btn btn-danger'>
              Удалить
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <h3>Документы</h3>
        <table className='table table-bordered table-responsive documents'>
          <thead>
            <tr>
              <th>Название</th>
              <th>Тип</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <textarea
                  ref={(textarea) => { this.addDocumentName = textarea; }}
                  placeholder='Текст нового документа'
                  className='form-control add-field'
                  rows='1'
                />
              </td>
              <td>
                <select
                  ref={(select) => { this.addDocumentType = select; }}
                  className='form-control'>
                  <option>Закон</option>
                  <option>Постановление</option>
                </select>
              </td>
              <td className='text-center'>
                <button
                  onClick={this.addButtonHandler}
                  type='button'
                  className='btn btn-info add-button'>
                  Добавить
                </button>
              </td>
            </tr>
            {template}
          </tbody>
        </table>
        <p className='alert alert-info' role='alert'>
          Для редактирования дважды кликните на ячейку.
        </p>
      </div>
    );
  }
}