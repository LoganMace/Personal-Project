import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import store from './store';
import routes from './routes';
import Header from './components/Header/Header';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div className="App">
            <Header />
            <div className='routes'>
              {routes}
            </div>
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
