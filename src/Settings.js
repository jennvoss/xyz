import React, { Component } from 'react';
import { db } from "./constants";
import './Settings.css';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      newName: ''
    };
  }

  handleInputChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  onSubmit = e => {
    e.preventDefault();
    this.addNewItem();
  };

  addNewItem() {
    const data = {
      name: this.state.newName,
      active: true
    };

    const newKey = db
      .ref()
      .child('/users/' + this.props.uid + '/items/')
      .push().key;

    const updates = {};
    updates['/users/' + this.props.uid + '/items/' + newKey] = data;
    return db.ref().update(updates);
  }

  updateItem = (key, val) => {
    db.ref('users/' + this.props.uid + '/items/' + key + '/active').set(val);
  };

  render() {
    return <div className="settings">
        <h1>Settings</h1>
        <form onSubmit={this.onSubmit}>
          <label>Create a new item:</label>
          <input type="text" name="newName" value={this.state.newName} onChange={this.handleInputChange} />
          <button type="submit">Submit</button>
        </form>
        {this.props.items &&
          <div>
            <h2>Items</h2>
            <ul className="items">
              {Object.keys(this.props.items).map(key => {
                return <li key={key}>
                    <input id={key} type="checkbox" checked={this.props.items[key].active} onChange={this.updateItem.bind(this, key)} />
                    <label htmlFor={key}>{this.props.items[key].name}</label>
                  </li>;
              })}
            </ul>
          </div>
        }
      </div>;
  }
}

export default Settings;
