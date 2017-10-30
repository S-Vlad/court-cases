import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';


export default class Header extends Component {
  render() {
    return(
      <header>
        <ul className='nav nav-tabs'>
          <li><NavLink to='/current-lawsuits' activeClassName='active'>Главная</NavLink></li>
          <li><NavLink to='/lawsuits' activeClassName='active'>Судебные дела</NavLink></li>
          <li><NavLink to='/documents' activeClassName='active'>Список документов</NavLink></li>
          <li><NavLink to='/participants/schedule' activeClassName='active'>Личная страница</NavLink></li>
          {/*<li><NavLink to='/lawsuit/schedule' activeClassName='active'></NavLink></li>
          <li><NavLink to='/lawsuit/document' activeClassName='active'>Архив дел</NavLink></li>*/}
        </ul>
      </header>
    );
  }
}