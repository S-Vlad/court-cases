import React, { Component } from 'react';


export default class AllParticipantsPage extends Component {
  componentDidMount() {
    this.props.getParticipants();
  }

  deleteButtonHandler(participantId) {
    this.props.deleteParticipant(participantId);
  }

  addButtonHandler(participantId) {
    let nameField = this.refs.addParticipantName,
        addressField = this.refs.addParticipantAddress,
        phoneField = this.refs.addParticipantPhone,
        typeField = this.refs.addParticipantType;

    if (nameField.value && typeField.value) {
      this.props.addParticipant(participantId, this.refs);

      nameField.value = '';
      addressField.value = '';
      phoneField.value = '';
      typeField.value = '';

    } else {
      alert('Введите имя и занимаемую сторону');
    }
  }

  editClickHandler(participantId) {
    this.props.editParticipant(participantId);
  }

  saveButtonHandler(participantId) {
    this.props.participants.data.forEach((item) => {

      if (item.objectId === participantId) {
        if (item.name !== this.refs.participantName.value ||
            item.address !== this.refs.participantAddress.value ||
            item.phone !== this.refs.participantPhone.value ||
            item.type !== this.refs.participantType.value) {
          this.props.saveParticipant(participantId, this.refs);

        } else {
          this.props.editParticipantCancel();
        }
      }
    });
  }

  render() {
    const props = this.props,
          data = props.participants.data;

    let template = [];

    if (data) {

        template = data.map((item, index) => {

        if (this.props.participants.edit === item.objectId) {
          return(
            <tr key={index}>
              <td>
                <input
                  className='form-control'
                  ref='participantName'
                  defaultValue={item.name}
                />
              </td>
              <td>
                <input
                  className='form-control'
                  ref='participantAddress'
                  defaultValue={item.address}
                />
              </td>
              <td>
                <input
                  className='form-control'
                  ref='participantPhone'
                  defaultValue={item.phone}
                />
              </td>
              <td>
                <input
                  className='form-control'
                  ref='participantType'
                  defaultValue={item.type}
                />
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
              <td
                onDoubleClick={this.editClickHandler.bind(this, item.objectId)}>
                {item.name}
              </td>
              <td
                onDoubleClick={this.editClickHandler.bind(this, item.objectId)}>
                {item.address}
              </td>
              <td
                onDoubleClick={this.editClickHandler.bind(this, item.objectId)}>
                {item.phone}
              </td>
              <td
                onDoubleClick={this.editClickHandler.bind(this, item.objectId)}>
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
          <h3>Участники</h3>
          <table className='table table-bordered participants'>
            <thead>
              <tr>
                <th>Имя</th>
                <th>Адрес</th>
                <th>Телефон</th>
                <th>Сторона</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    ref='addParticipantName'
                    className='form-control'
                    placeholder='Имя' />
                </td>
                <td>
                  <input
                    ref='addParticipantAddress'
                    className='form-control'
                    placeholder='Адресс' />
                </td>
                <td>
                  <input
                    ref='addParticipantPhone'
                    className='form-control'
                    placeholder='Телефон' />
                </td>
                <td>
                  <input
                    ref='addParticipantType'
                    className='form-control'
                    placeholder='Сторона' />
                </td>
                <td className='text-center'>
                  <button
                    onClick={this.addButtonHandler.bind(this, this.props.participants.objectId)}
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