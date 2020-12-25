import './App.css';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import { Component } from 'react';
// import { render } from '@testing-library/react';

const app = new Clarifai.App({
  apiKey: '14387d3c2ff44db5b2d2f67add6cd697'
 });

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }
  OnInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  OnSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
  function(response) {
    // do something with response
    console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
  },
  function(err) {
    // there was an error
  }
);
  }
  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm OnInputChange={this.OnInputChange} OnSubmit = {this.OnSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl}/> 
      </div>
    );
  }
}

export default App;
