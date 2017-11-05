import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class CurrentDocumentsPage extends Component {
  constructor() {
    super();

    this.editButtonHandler = this.editButtonHandler.bind(this);
    this.saveButtonHandler = this.saveButtonHandler.bind(this);
  }

  componentDidMount() {
    this.props.getDocuments(this.props.location.params.document);
  }

  editButtonHandler() {
    this.props.editDocument();
  }

  saveButtonHandler() {
    this.props.saveDocument(
      this.props.documents.data[0].objectId,
      this.refs
    );
  }

  render() {
    const data = this.props.documents.data;

    let template,
        selectTempl;

      if (!this.props.documents.edit || this.props.location.path.indexOf('edit') === -1) {
        // return(
          template = data.map((item, index) => {

            return(
              <div key={index}>
                <h4 className='text-center'>{item.type}</h4>
                <h4 className='text-center' >{item.name}</h4>
                <Link to={`/documents/edit/${item.objectId}`}>
                  <button
                    onClick={this.editButtonHandler}
                    type='button'
                    className='btn btn-info'>
                    Редактировать
                  </button>
                </Link>
              </div>
            )

          })
        // );
      } else /*if (this.props.documents.edit && this.props.location.path.indexOf('edit') !== -1)*/ {
        // return(
          template = data.map((item, index) => {
            if (item.type === 'Закон') {
              selectTempl = (
                <select ref='saveDocumentSelect' className='form-control'>
                  <option>Закон</option>
                  <option>Постановление</option>
                </select>
              );
            } else {
              selectTempl = (
                <select ref='saveDocumentSelect' className='form-control'>
                  <option>Постановление</option>
                  <option>Закон</option>
                </select>
              );
            }

            return(

              <div key={index}>
                <textarea
                  className='document-edit form-control'
                  defaultValue={item.name}
                  ref='saveDocumentInput'
                  rows='4'/>
                {selectTempl}
                <Link to={`/documents/${item.objectId}`}>
                  <button
                    onClick={this.saveButtonHandler}
                    type='button'
                    className='btn btn-info'>
                    Сохранить
                  </button>
                </Link>
              </div>
            )

          })
        // );
      }

      return(
        <div>
          <h3>Документ</h3>
          {template}
        </div>
      );
  }
}