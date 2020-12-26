import './App.css';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import { Component } from 'react';

const app = new Clarifai.App({
  apiKey: '14387d3c2ff44db5b2d2f67add6cd697'
});

const particlesOptions = {
  particles: {
    number: {
      value: 40,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signIn',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
    console.log(box);
  }

  OnInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  OnSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => { this.displayFaceBox(this.calculateFaceLocation(response)); })
      .catch((err) => { console.log(err); });
  }
  OnRouteChange = (route) => {
    if (route === 'signIn') {
      this.setState({ isSignedIn: false })
    }
    else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    // else {
      this.setState({ route: route });
    
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={this.state.isSignedIn} OnRouteChange={this.OnRouteChange} />
        {this.state.route === 'home'
          ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm OnInputChange={this.OnInputChange} OnSubmit={this.OnSubmit} />
            <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
          </div>
          : (
            this.state.route === 'signIn'
              ? <SignIn OnRouteChange={this.OnRouteChange} />
              : <Register OnRouteChange={this.OnRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
