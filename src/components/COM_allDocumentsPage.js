import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class AllDocumentsPage extends Component {
  constructor() {
    super();

    this.addButtonHandler = this.addButtonHandler.bind(this);
  }

  componentDidMount() {
    this.props.getDocuments();
  }

  addButtonHandler() {
    let textElement = this.refs.addDocumentInput;

    if (textElement.value) {
      this.props.addDocument(this.refs);
      textElement.value = '';
    } else {
      alert('Введите название документа');
    }
  }

  deleteButtonHandler(objectId) {
    this.props.deleteDocument(objectId);
  }

  render() {
    const props = this.props;
    let template = [];

    if (props.documents.data) {
      const data = props.documents.data;

      template = data.map((item, index) => {
        return(
          <tr key={index}>
            <td><Link to={`/documents/${item.objectId}`}>{item.name}</Link></td>
            <td>{item.type}</td>
            <td className='text-center'>
              <button
                  onClick={this.deleteButtonHandler.bind(this, item.objectId)}
                  type='button'
                  className='btn btn-danger add-documents'>
                  Удалить
                </button>
            </td>
          </tr>
        );
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
                  placeholder='Введите текст нового документа'
                  className='form-control'
                  rows='1'
                  type='text'>
                </textarea>
              </td>
              <td>
                <select ref='addDocumentSelect' className='form-control'>
                  <option>Закон</option>
                  <option>Постановление</option>
                </select>
              </td>
              <td>
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
      </div>
    );
  }
}