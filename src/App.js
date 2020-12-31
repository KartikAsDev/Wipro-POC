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

  /**
   Handle click with be called when user clicks or changes the value of the search box
   Will make call to getSuggestions to pick suggestions and set the state for the same
   Will find the matching option from suggestions array
   will update the bg color of the matched item
   */
  handleClick(e) {
    document.getElementById('suggestionModal').hidden = false;
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

  /**
   select item will be called on selecting an item from the suggestions
   will update the input value by setting the state input value by selected item
   will make the suggestion list empty
   will put the focus back to input box
   */
  selectItem(e, data) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      inputValue: data + " ",
      suggestions: [],
    });
    document.getElementById('searchBox').focus();
    document.getElementById('suggestionModal').hidden = true;
  }

  onExitingInputBox(e) {
    // document.getElementById('suggestionBox').hidden = true;
  }

  render() {
    /**
     * making suggestion list here
     */
    const showSuggestions =  <ul id="suggestionBox">
          {this.state.suggestions.map(item =>
          <li className="suggestionItem"
                key={item} 
                onClick={(e) => this.selectItem(e, item)}>
                {item}
              </li>)}
          </ul>

    return (
      /**
       * Onclick is used because we need to trigger handleClick when user put the focus on the input box to get and render the suggestions
       */
      <div className="app">
        <div >
         <span> Search : <input name="search" 
                type="text"
                value={this.state.inputValue}
                id="searchBox"
                onChange={(e) => this.handleClick(e)} 
                onClick={(e) => this.handleClick(e)}>
          </input></span>
          <div id="suggestionModal" hidden>
            {showSuggestions}
          </div>
        </div>
      </div>
    );
  }
}
export default App;
