import React from 'react';
import { NavLink } from 'react-router-dom';

import '../App.css';


export default function Header() {
  return (
    <header>
      <nav className='navbar navbar-expand-md navbar-light bg-light'>
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon' />
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <NavLink
                to='/open-lawsuits'
                className='nav-link'
                activeClassName='active'>
                Главная
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='/lawsuits'
                className='nav-link'
                activeClassName='active'>
                Судебные дела
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='/documents'
                className='nav-link'
                activeClassName='active'>
                Список документов
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='/participants'
                className='nav-link'
                activeClassName='active'>
                Участники
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}