import React, { Component } from 'react';


export default class AllDocumentsPage extends Component {
  constructor() {
    super();

    this.addButtonHandler = this.addButtonHandler.bind(this);
  }

  componentDidMount() {
    this.props.getDocuments();
  }

  addButtonHandler() {
    let nameField = this.refs.addDocumentInput;

    if (nameField.value) {
      this.props.addDocument(this.refs);
      nameField.value = '';
    } else {
      alert('Введите название документа');
    }
  }

  editClickHandler(documentId) {
    this.props.editDocument(documentId);
  }

  saveButtonHandler(documentId) {
    this.props.documents.data.forEach((item) => {

      if (item.objectId === documentId) {
        if (item.name !== this.refs.documentName.value ||
            item.type !== this.refs.documentType.value) {
          this.props.saveDocument(documentId, this.refs);

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
    const props = this.props,
          data = props.documents.data;

    let template = [];

    if (data) {

      template = data.map((item, index) => {

        if (this.props.documents.edit === item.objectId) {
          return(
            <tr key={index}>
              <td>
                <textarea
                  className='form-control'
                  ref='documentName'
                  defaultValue={item.name}
                  rows='1'>
                </textarea>
              </td>
              <td>
                <select ref='documentType' className='form-control'>
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
        } else {
          return(
            <tr key={index}>
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
        }
      });
    }

    return(
      <div>
        <h3>Документы</h3>
        <table className='table table-bordered documents'>
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
                  ref='addDocumentInput'
                  placeholder='Текст нового документа'
                  className='form-control'
                  rows='1'>
                </textarea>
              </td>
              <td>
                <select ref='addDocumentSelect' className='form-control'>
                  <option>Закон</option>
                  <option>Постановление</option>
                </select>
              </td>
              <td className='text-center'>
                <button
                  onClick={this.addButtonHandler}
                  type='button'
                  className='btn btn-info'>
                  Добавить
                </button>
              </td>
            </tr>
            {template}
          </tbody>
        </table>
        <p className='alert alert-info' role='alert'>Для редактирования дважды кликните на ячейку.</p>
      </div>
    );
  }
}