import logo from './logo.svg';
import './App.css';
import React, {Component} from "react";
import Showdata from './showdata'

class App extends Component {

  state = {
    books: []
  };
  render() { 
    return (
    <div className="App">
      {this.temp}
      <Showdata/>
    </div>
  );
  }
}

export default App;
