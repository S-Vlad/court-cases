import React, { Component } from 'react';
import router from './router.js';


export default class App extends Component {
  render() {
    return (
      <div className='App container'>
        {router}
      </div>
    );
  }
}
