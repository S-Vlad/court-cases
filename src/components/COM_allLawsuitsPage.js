import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class AllLawsuitsPage extends Component {
  constructor() {
    super();

    this.findButtonHandler = this.findButtonHandler.bind(this)
  }

  componentDidMount() {
    this.props.getLawsuits(true);
  }

  findButtonHandler(){
    this.props.findLawsuits(this.refs.searchInput.value);
  }

  render() {
    const props = this.props;
    let template = [],
        notFoundMessage;

    if (props.lawsuits.data) {
      const data = props.lawsuits.data;

      template = data.map((item, index) => {

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

        return(
          <tr key={index}>
            <td><Link to={`/current-lawsuit/${item.objectId}`}>{item.state}</Link></td>
            <td>{claimant.name ? claimant.name : ''}</td>
            <td>{respondent.name ? respondent.name : ''}</td>
            <td>{judge.name ? judge.name : ''}</td>
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

    return(
      <div>
        <h3>Текущие судебные дела</h3>
        <form className='form-inline'>
          <input
            ref='searchInput'
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
              <th>Истец</th>
              <th>Ответчик</th>
              <th>Судья</th>
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