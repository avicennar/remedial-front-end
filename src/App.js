import React, { Component } from 'react';
import MovieList from './component/MovieList';
import Header from './component/Header';
import Home from './component/Home';
import Categories from './component/Categories';
import ConnectionList from './component/ConnectionList';
import { Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header navBrand={'Movies'} />
          <div>
            <Route path = "/" component={Home}/>
            <Route path = "/editmovie" component={MovieList}/>
            <Route path = "/editkategori" component={Categories}/>
            <Route path = "/editconnection" component={ConnectionList}/>
          </div>
        </div>
      );
    }
  }

export default App;
