import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: {
        '11/22/2018': { 1: true, 2: true }
      },
      selectedDate: this.formatDate(new Date()),
      items: {},
      activeItems: {}
    };
  }

  componentDidMount() {
    let list = {
      1: {name: 'one', active: false},
      2: {name: 'two', active: true},
      3: {name: 'three', active: true}
    };

    this.setState({items: list, activeItems: this.getActiveItems(list)});
  }
  getActiveItems = list => {
    let newList = {};
    Object.keys(list).forEach(i => {
      if (list[i].active) newList[i] = false;
    });
    return newList;
  };

  formatDate(date) {
    return [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('/');
  }
  adjustDay(days) {
    var result = new Date(this.state.selectedDate);
    result.setDate(result.getDate() + days);
    return this.formatDate(result);
  }
  previous = () => {
    this.setState({selectedDate: this.adjustDay(-1)});
  };
  next = () => {
    this.setState({selectedDate: this.adjustDay(1)});
  };
  getItems(id) {
    let itemsForDate = this.state.dates[id] || this.state.activeItems;

    return Object.keys(itemsForDate).map(i => {
      return {
        key: i,
        name: this.state.items[i].name,
        value: this.state.dates[id] ? itemsForDate[i] : false
      };
    });
  }

  updateItem = (i) => {
    const objToUpdate = this.state.dates[this.state.selectedDate] || this.state.activeItems;

    this.setState({
      dates: {
        ...this.state.dates,
        [this.state.selectedDate]: {
          ...objToUpdate,
          [i.key]: !i.value
        }
      }
    });
  }

  render() {
    return <div className="App">
      <h1>{this.state.selectedDate}</h1>
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
