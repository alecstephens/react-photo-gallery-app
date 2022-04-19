import React, { Component } from "react";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import axios from 'axios';
import apiKey from './config';

// Components
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';
import NotFound from './components/NotFound';
import SearchForm from './components/SearchForm';
import { render } from "express/lib/response";

//Flickr Api
const photoKey = apiKey;

class App extends Component {
  constructor () {
    super();
    this.state = {
      photos: [],
      sun: [],
      moon: [],
      clouds: [],
      loading: true,
      query: ''
    };
  }

  componentDidMount() {
    this.performSearch();
    this.performSearch('sun');
    this.performSearch('moon');
    this.performSearch('clouds');
  }

  performSearch = (query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${photoKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        if(query === 'sun') {
          this.setState ({
            sun: response.data.photos.photo,
            loading: false
          })
        } if(query === 'sun') {
          this.setState({ sun: response.data.photos.photo })
        } if(query === 'moon') {
          this.setState({ moon: response.data.photos.photo })
        } if(query === 'clouds') {
          this.setState({ clouds: response.data.photos.photo })
        }
      })
    
      .catch(error => {
        console.log('Error fetching and parsing the data', error);
      });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <h1>Phtoto Gallery that uses Flickr and React.js</h1>
        <searchBar onSearch={this.performSearch} />
        <Nav />
        <Routes>
          <Route path="/sun" render={() => <PhotoContainer photos={this.state.sun} isLoading={this.state.isLoading} />} />
          <Route path="/moon" render={() => <PhotoContainer photos={this.state.moon} isLoading={this.state.isLoading} />} />
          <Route path="/clouds" render={() => <PhotoContainer photos={this.state.clouds} isLoading={this.state.isLoading} />} />
          <Route component={NotFound} />
        </Routes>
        </div>
      </BrowserRouter>
    );
  
  }

}

export default App;
