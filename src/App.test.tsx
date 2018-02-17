import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { uint32func } from './test/Integer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  console.log(uint32func());
});