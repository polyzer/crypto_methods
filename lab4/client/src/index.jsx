import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import Hello from './components/Hello.jsx';

ReactDOM.render(
    <Hello />,
    document.querySelector('#root')
);

if (module.hot) {
  module.hot.accept();
}