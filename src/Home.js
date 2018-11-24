import React, { Component } from 'react';
import { db } from './constants';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: this.formatDate(new Date()),
      activeItems: {}
    };
  }
  componentDidMount() {
    this.setState({activeItems: this.getActiveItems(this.props.items)});
  }
  getActiveItems = list => {
    let newList = {};
    Object.keys(list).forEach(i => {
      if (list[i].active) newList[i] = false;
    });
    return newList;
  };
  formatDate(date) {
    return [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('-');
  }
  adjustDay(days) {
    var result = new Date(this.state.selectedDate);
    result.setDate(result.getDate() + days);
    return this.formatDate(result);
  }
  previous = () => {
    this.setState({selectedDate: this.adjustDay(-1)});
  }
  next = () => {
    this.setState({selectedDate: this.adjustDay(1)});
  }
  getItems(id) {
    let itemsForDate = this.props.dates[id] || this.state.activeItems;

    return Object.keys(itemsForDate).map(i => {
      return {
        key: i,
        name: this.props.items[i].name,
        value: this.props.dates[id] ? itemsForDate[i] : false
      };
    });
  }

  updateItem = i => {
    const newValue = {
      ...(this.props.dates[this.state.selectedDate] || this.state.activeItems),
      [i.key]: !i.value
    };
    const datesRef = 'users/' + this.props.uid + '/dates/' + this.state.selectedDate;
    db.ref(datesRef).set(newValue);

  }
  getHeading() {
    const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    const date = this.state.selectedDate.replace(/-/g, '/');
    return days[new Date(this.state.selectedDate).getDay()] + ' ' + date;
  }

  render() {
    return <div className="App">
        <h1>{this.getHeading()}</h1>
        <div className="content">
          <button className="prev" onClick={this.previous}>
            &lsaquo;
          </button>
          <button className="next" onClick={this.next}>
            &rsaquo;
          </button>
          <ul className="items">
            {this.getItems(this.state.selectedDate).map(i => (
              <li key={i.key}>
                <input
                  id={i.key}
                  type="checkbox"
                  checked={i.value}
                  onChange={this.updateItem.bind(this, i)}
                />
                <label htmlFor={i.key}>{i.name}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>;
  }
}

export default App;
