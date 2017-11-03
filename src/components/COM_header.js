import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';


export default class Header extends Component {
  render() {
    return(
      <header>
        <nav className='navbar navbar-default'>
          <div className='container-fluid'>
            <div className='navbar-header'>
              <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar' aria-expanded='false' aria-controls='navbar'>
                <span className='sr-only'>Toggle navigation</span>
                <span className='icon-bar'></span>
                <span className='icon-bar'></span>
                <span className='icon-bar'></span>
              </button>
            </div>
            <div id='navbar' className='navbar-collapse collapse'>
              <ul className='nav navbar-nav'>
                <li><NavLink to='/open-lawsuits' activeClassName='active'>Главная</NavLink></li>
                <li><NavLink to='/lawsuits' activeClassName='active'>Судебные дела</NavLink></li>
                <li><NavLink to='/documents' activeClassName='active'>Список документов</NavLink></li>
                <li><NavLink to='/participants/schedule' activeClassName='active'>Личная страница</NavLink></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}