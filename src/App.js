import React, { Component } from 'react';
import './App.css';
import Table from 'react-bootstrap/Table';
import Modal from './Modal';

class App extends Component{
  constructor() {
    super();
    this.state = {
      movieItems: [],
      show: false,
      currentMovie: null,
    }
  }

  componentDidMount() {
    fetch("https://ghibliapi.herokuapp.com/films")
      .then(res => res.json())
      .then(
        (result) => {
         this.setState({
           movieItems: result,
         })
        },
        (error) => {
          console.log('Error', error);
        }
      )
  }

  showModal = (item) => {
    this.setState({ 
      show: true,
      currentMovie: item,
    });
  }
  
  hideModal = () => {
    this.setState({ show: false });
  }

  render() {
    const items = this.state.movieItems;

    const moviePoster = 'https://instagram.fknu1-1.fna.fbcdn.net/v/t51.2885-15/e35/15043434_155934458210613_6676873630565007360_n.jpg?_nc_ht=instagram.fknu1-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=jcrHn1-ptSMAX95R5PZ&_nc_tp=18&oh=d5da5c78a8645e8eb98b6dfaf296747c&oe=5F978ACC';
    return (
      <div className="App">
        <header className="App-header">
            Movies
        </header>
        <hr />
        <Table striped bordered hover responsive>  
          <thead>
            <tr>
              <th>The Movie Title</th>
              <th>The Director’s Name</th>
              <th>Movie’s Rating</th>
              <th>Movie Poster</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
                <tr key={item.id}>
                  <td onClick={() => this.showModal(item)}>{item.title}</td>
                  <td>{item.director}</td>
                  <td>{item.rt_score}</td>
                  {/* <td>{item.url}</td> */}
                  <td><img src={moviePoster} alt="Movie-Image" height='30' width='30'></img></td>
                </tr>
              ))}
          </tbody>    
        </Table>
        <Modal show={this.state.show} handleClose={this.hideModal} currentMovie={this.state.currentMovie}>
        </Modal>
      </div>
    );
  }
}

export default App;
