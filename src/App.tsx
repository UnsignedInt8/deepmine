import * as React from 'react';
import './App.css';
const logo = require('./logo.svg');
import { WebglTest } from './test/WebglTest';
import axios from 'axios';

class App extends React.Component {

  async componentDidMount() {
    // setTimeout(() => new WebglTest(vs, fs), 3000);
    let vs = (await axios.get('./vs.glsl')).data;
    let fs = (await axios.get('./fs.glsl')).data;
    new WebglTest(vs, fs);
  }

  render() {
    return (
      <div className="App">
        <canvas id='ccc' width={128} height={128}>your browser</canvas>
      </div>
    );
  }
}

export default App;
