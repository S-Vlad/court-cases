import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class AllParticipantsPage extends Component {
  static propTypes = {
    participants: PropTypes.object.isRequired,
    addParticipant: PropTypes.func.isRequired,
    deleteParticipant: PropTypes.func.isRequired,
    editParticipant: PropTypes.func.isRequired,
    editParticipantCancel: PropTypes.func.isRequired,
    getParticipants: PropTypes.func.isRequired,
    saveParticipant: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getParticipants();
  }

  deleteButtonHandler(participantId) {
    this.props.deleteParticipant(participantId);
  }

  addButtonHandler = () => {
    const refs = {
      addParticipantName: this.addParticipantName,
      addParticipantAddress: this.addParticipantAddress,
      addParticipantPhone: this.addParticipantPhone,
      addParticipantType: this.addParticipantType,
    };

    const nameField = refs.addParticipantName;
    const addressField = refs.addParticipantAddress;
    const phoneField = refs.addParticipantPhone;
    const typeField = refs.addParticipantType;

    if (nameField.value && typeField.value) {
      this.props.addParticipant(refs);

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
    const refs = {
      participantName: this.participantName.value,
      participantAddress: this.participantAddress.value,
      participantPhone: this.participantPhone.value,
      participantType: this.participantType.value,
    };

    this.props.participants.data.forEach((item) => {
      if (item.objectId === participantId) {
        if (item.name !== refs.participantName ||
            item.address !== refs.participantAddress ||
            item.phone !== refs.participantPhone ||
            item.type !== refs.participantType) {
          this.props.saveParticipant(participantId, refs);
        } else {
          this.props.editParticipantCancel();
        }
      }
    });
  }

  render() {
    const props = this.props;
    const data = props.participants.data;

    let template = [];

    if (data) {
      template = data.map((item) => {
        if (this.props.participants.edit === item.objectId) {
          return (
            <tr key={item.objectId}>
              <td>
                <input
                  ref={(input) => { this.participantName = input; }}
                  className='form-control'
                  defaultValue={item.name}
                />
              </td>
              <td>
                <input
                  ref={(input) => { this.participantAddress = input; }}
                  className='form-control'
                  defaultValue={item.address}
                />
              </td>
              <td>
                <input
                  ref={(input) => { this.participantPhone = input; }}
                  className='form-control'
                  defaultValue={item.phone}
                />
              </td>
              <td>
                <input
                  ref={(input) => { this.participantType = input; }}
                  className='form-control'
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
        }

        return (
          <tr key={item.objectId}>
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
      });
    }

    return (
      <div>
        <h3>Участники</h3>
        <table className='table table-bordered table-responsive participants'>
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
                  ref={(input) => { this.addParticipantName = input; }}
                  className='form-control add-participant-name'
                  placeholder='Имя'
                />
              </td>
              <td>
                <input
                  ref={(input) => { this.addParticipantAddress = input; }}
                  className='form-control add-participant-address'
                  placeholder='Адресс'
                />
              </td>
              <td>
                <input
                  ref={(input) => { this.addParticipantPhone = input; }}
                  className='form-control add-participant-phone'
                  placeholder='Телефон'
                />
              </td>
              <td>
                <input
                  ref={(input) => { this.addParticipantType = input; }}
                  className='form-control add-participant-type'
                  placeholder='Сторона'
                />
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