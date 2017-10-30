import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class NotFoundPage extends Component {
  render() {
    return(
      <div className='col-md-12'>
        <h3>Page not found. Go to <Link to='/'>main</Link> page</h3>
      </div>
    );
  }
}