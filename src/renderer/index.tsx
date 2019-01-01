import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';

const mount = document.createElement('div');
document.head.append();
document.body.appendChild(mount);

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  mount
);

// Hot Module Replacement API
if (typeof module.hot !== 'undefined') {
  module.hot.accept('./App', () => {
    ReactDOM.render(<App />, mount);
  });
}
