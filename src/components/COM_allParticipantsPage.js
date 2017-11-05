import React, { Component } from 'react';


export default class AllParticipantsPage extends Component {
  componentDidMount() {
    this.props.getParticipants();
  }

  editHandler(objectId, ref) {
    this.props.editParticipant(objectId);
    console.log(objectId);
    console.log(ref);
  }

  saveHandler() {
    this.props.saveParticipants();
  }

  deleteButtonHandler(objectId) {
    this.props.deleteParticipant(objectId);
  }

  render() {
    const props = this.props,
          data = props.participants.data;

    let template = [];

    if (data && data.length > 0) {

      let edit = this.props.participants.edit;

        template = data.map((item, index) => {

        if (edit === item.objectId) {
        return(
          <tr key={index}>
            <td>
              <input
                onBlur={this.saveHandler.bind(this)}
                className='form-control'
                ref='participantName'
                defaultValue={item.name}
              />
            </td>
            <td>
              <input
                onBlur={this.saveHandler.bind(this)}
                className='form-control'
                ref='participantAddress'
                defaultValue={item.address}
              />
            </td>
            <td>
              <input
                onBlur={this.saveHandler.bind(this)}
                className='form-control'
                ref='participantPhone'
                defaultValue={item.phone}
              />
            </td>
            <td>
              <input
                onBlur={this.saveHandler.bind(this)}
                className='form-control'
                ref='participantType'
                defaultValue={item.type}
              />
            </td>
            <td className='text-center'>
              <span
                onClick={this.deleteButtonHandler.bind(this, item.objectId)}
                className='glyphicon glyphicon-remove'>
              </span>
            </td>
          </tr>
        );
      } else {
        return(
         <tr key={index}>
            <td
              onDoubleClick={this.editHandler.bind(this, item.objectId, 'participantName')}
              >
              {item.name}
            </td>
            <td
              onDoubleClick={this.editHandler.bind(this, item.objectId, 'participantAddress')}
              >
              {item.address}
            </td>
            <td
              onDoubleClick={this.editHandler.bind(this, item.objectId, 'participantPhone')}
              >
              {item.phone}
            </td>
            <td
              onDoubleClick={this.editHandler.bind(this, item.objectId, 'participantType')}
              >
              {item.type}
            </td>
            <td className='text-center'>
              <span
                onClick={this.deleteButtonHandler.bind(this, item.objectId)}
                className='glyphicon glyphicon-remove'>
              </span>
            </td>
          </tr>
        );
      }

      });
    }

    return(
        <div>
          <h3>Участники</h3>
          <table className='table table-bordered participants'>
            <thead>
              <tr>
                <th>Имя</th>
                <th>Адрес</th>
                <th>Телефон</th>
                <th>Сторона</th>
                <th>Удалить</th>
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

// <td>{(edit ? <input defaultValue={item.name} /> : <span>{item.name}</span>) }</td>