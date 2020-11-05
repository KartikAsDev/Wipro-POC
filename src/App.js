import React, { Component } from 'react';
import './App.css';

class App extends Component{
  constructor() {
    super();
    this.state = {
      n: '',
    }
  }


  componentDidUpdate(props, state) {
    document.getElementById('chessBoard').innerHTML = "";
    var chessBoard = document.getElementById('chessBoard');
    for (var i = 0; i < this.state.n; ++i){
      var row = document.createElement('div')
      row.className = 'row';

      if(this.state.n%2 === 0 && i % 2 === 0) {
        row.style.flexDirection = 'row-reverse'; 
      } 
      row.style.height = `${400/this.state.n}px`;
      for (var j = 0; j < this.state.n; ++j){
        var column = document.createElement('div')
        column.className = 'column';
        if(this.state.n%2 !== 0 && i%2 === 0) {
          column.style.backgroundColor = j % 2 === 0 ? 'white' : 'black';
        } else if(this.state.n%2 !== 0 && i%2 !== 0) {
          column.style.backgroundColor = j % 2 === 0 ? 'black' : 'white';
        } else {
          column.style.backgroundColor = j % 2 === 0 ? 'white' : 'black';
        }
        column.style.width = `${400/this.state.n}px`;
        column.style.height = `${400/this.state.n}px`;
        column.id = `column${i}${j}`;
        column.onclick = (ele) => {
          console.log('ele inside', ele);
          this.handleSelect(ele);
          ele.tabIndex="0"
          ele.target.focus();
        }
        row.appendChild(column)
      }
      chessBoard.appendChild(row)
    }   
   }

   handleValueOfN(ele) {
     this.setState({
       n: ele.target.value,
     });
   }

   handleSelect(ele) {
    ele.target.style.backgroundColor = 'yellow';
   }

   handleClick(ele) {
    console.log('ele', ele);
   }

  render() {
    return (
      <div className="app">
        <div className="inputDiv">
          <span> Enter Grid Size </span>
          <input value={this.state.n} onChange={(ele) => this.handleValueOfN(ele)}></input>
        </div>

        <div id="chessBoard" className="chessBoard" onClick={(ele) => this.handleClick(ele)}>
        </div>
      </div>
    );
  }
}
export default App;
