import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


export default class AllLawsuitsPage extends Component {
  static propTypes = {
    getLawsuits: PropTypes.func.isRequired,
    findLawsuits: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getLawsuits(true);
  }

  findButtonHandler = () => {
    this.props.findLawsuits(this.searchInput.value);
  }

  render() {
    const props = this.props;
    let template = [],
        notFoundMessage;

    if (props.lawsuits.data) {
      const data = props.lawsuits.data;

      template = data.map((item) => {
        let claimant,
            respondent,
            judge;

        item.participants_id.forEach((itemParticipants) => {
          if (itemParticipants.type === 'Истец') {
            claimant = itemParticipants;
          } else if (itemParticipants.type === 'Ответчик') {
            respondent = itemParticipants;
          } else {
            judge = itemParticipants;
          }
        });

        return (
          <tr key={item.objectId}>
            <td><Link to={`/current-lawsuit/${item.objectId}`}>{item.state}</Link></td>
            <td>
              <p><span>Истец:</span> {claimant ? claimant.name : ''}</p>
              <p><span>Ответчик:</span> {respondent ? respondent.name : ''}</p>
              <p><span>Судья:</span> {judge ? judge.name : ''}</p>
            </td>
            <td>{item.type}</td>
            <td>{item.schedule_id[0] ? item.schedule_id[0].date_ : ''}</td>
            <td>{item.documents_id[0] ? item.documents_id[0].name : ''}</td>
          </tr>
        );
      });

      if (template.length === 0) {
        notFoundMessage = (<p>Поиск не дал результата</p>);
      }
    }

    return (
      <div>
        <h3>Судебные дела</h3>
        <form className='form-inline'>
          <input
            ref={(input) => { this.searchInput = input; }}
            type='text'
            className='form-control'
            id='search-field'
            placeholder='Текст'
          />
          <button
            onClick={this.findButtonHandler}
            type='button'
            className='btn btn-default'>
            Поиск
          </button>
        </form>
        <table className='table table-bordered lawsuit'>
          <thead>
            <tr>
              <th>Статус</th>
              <th>Стороны</th>
              <th>Тип</th>
              <th>Дата</th>
              <th>Статья</th>
            </tr>
          </thead>
          <tbody>
            {template}
          </tbody>
        </table>
        {notFoundMessage}
      </div>
    );
  }
}