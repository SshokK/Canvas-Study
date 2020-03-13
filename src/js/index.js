import React from 'react'
import { render } from 'react-dom'
import App from 'Components/App/App'
import './index.css'
import { Provider } from 'react-redux'
import store from './store'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
