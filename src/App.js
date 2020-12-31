import React, { Component } from 'react';
import './App.css';
import { getSuggestions } from './mock-server'

class App extends Component{
  constructor() {
    super();
    this.state = {
      suggestions: [],
      inputValue: '',
    }
  }

  handleClick(e) {
    document.getElementById('suggestionModal').style.display = "block";
    document.getElementById('suggestionBox').hidden = false;
    let value = e.target.value;
    getSuggestions(value).then(suggestions => {
      this.setState({
        suggestions: suggestions,
        inputValue: value,
      }) ;

      const matchingItem = suggestions.find(item => {
        return item.indexOf(value) !== -1;
      });

      const listItems = document.getElementsByTagName('li');
      for(let i =0; i < listItems.length; i++) {
        if(listItems[i].outerText === matchingItem) {
          listItems[i].setAttribute('style', 'background-color: #E0E0E0');
        }
      }
    });
  }

  selectItem(e, data) {
    document.getElementById('suggestionModal').style.display = "none";
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      inputValue: data + " ",
      suggestions: [],
    });
    document.getElementById('searchBox').focus();
    document.getElementById('suggestionBox').hidden = true;
  }

  onExitingInputBox(e) {
    // document.getElementById('suggestionBox').hidden = true;
  }

  render() {
    const showSuggestions =  <ul id="suggestionBox">
          {this.state.suggestions.map(item =>
          <li className="suggestionItem"
                key={item} 
                onClick={(e) => this.selectItem(e, item)}>
                {item}
              </li>)}
          </ul>

    return (
      <div className="app">
        <div >
          <input name="search" 
                type="text"
                value={this.state.inputValue}
                id="searchBox"
                onChange={(e) => this.handleClick(e)}
                onClick={(e) => this.handleClick(e)}>
          </input>
          <div id="suggestionModal">
            {showSuggestions}
          </div>
        </div>
      </div>
    );
  }
}
export default App;
