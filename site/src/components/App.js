import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Win from './Win';
import Lose from './Lose';
import '../styles/App.css';

export default class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/win/:username" component={Win}/>
          <Route path="/lose/:username" component={Lose}/>
        </Switch>
      </div>
    );
  }

}
