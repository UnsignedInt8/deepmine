import * as React from 'react';
import './App.css';
const logo = require('./logo.svg');
import { WebglTest } from './test/WebglTest';
import axios from 'axios';
import { SHA256 } from './crypto/SHA256';

class App extends React.Component {

  async componentDidMount() {
    // setTimeout(() => new WebglTest(vs, fs), 3000);
    let vs = (await axios.get('./vs.glsl')).data;
    let sha256fs = (await axios.get('./shaders/fragments/sha256.glsl')).data;
    let fs = (await axios.get('./fs.glsl')).data;

    // new WebglTest(vs, fs);
    let sha256 = new SHA256(vs, sha256fs);
    sha256.hash(new Uint8Array(0));
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
