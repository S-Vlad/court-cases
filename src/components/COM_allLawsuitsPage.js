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
    let template = [];

    if (props.lawsuits.data) {
      const data = props.lawsuits.data;

      template = data.map((itemTempl, index) => {

        let claimant,
            respondent,
            judge,
            participants = itemTempl.participants_id;

        participants.forEach((item) => {
          if (item.type === 'Истец') {
            claimant = item;
          } else if (item.type === 'Ответчик') {
            respondent = item;
          } else {
            judge = item;
          }
        });

        return(
          <tr key={index}>
            <td><Link to={`/current-lawsuit/${itemTempl.objectId}`}>{itemTempl.state}</Link></td>
            <td>{claimant.name}</td>
            <td>{respondent.name}</td>
            <td>{judge.name}</td>
            <td>{itemTempl.type}</td>
            <td>{itemTempl.schedule_id[0].date_}</td>
            <td>{itemTempl.documents_id[0].name}</td>
          </tr>
        );
      });
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
        <table className='table table-bordered'>
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
      </div>
    );
  }
}