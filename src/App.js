import React, { Component } from 'react';
import Home from './Home';
import Settings from './Settings';
import './App.css';
import { checkLogin } from './auth';
import {db} from './constants';

class App extends Component {
  constructor() {
    super();
    this.state = {loggedIn: false, loading: true, page: ''};
  }

  componentWillMount() {
    checkLogin(user => {
      if (!user) {
        this.props.history.push('/login');
        return;
      }
      this.setState({loggedIn: true, uid: user.uid});
      this.getUserData();
    });
  }

  getUserData() {
    const userData = db.ref('/users/' + this.state.uid);
    userData.on('value', snapshot => {
      const val = snapshot.val();

      this.setState({loading: false});

      if (!val || !val.items) {
        this.setState({page: 'settings'});
        return;
      }

      this.setState({
        items: val.items || {},
        dates: val.dates || {},
        page: this.state.page || 'home'
      });
    });
  }
  goTo = () => {
    this.setState({ page: this.state.page === 'home' ? 'settings' : 'home' });
  }

  render() {
    return (
      <div>
        {this.state.loading && <p>Loading</p>}
        {!this.state.loading && (
          <div>
            <button className="nav" onClick={this.goTo}>
              {this.state.page === 'home' ? 'Settings' : 'Close'}
            </button>
            {this.state.page === 'home' ? (
              <Home uid={this.state.uid} items={this.state.items} dates={this.state.dates} />
            ) : (
              <Settings uid={this.state.uid} items={this.state.items} />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default App;
