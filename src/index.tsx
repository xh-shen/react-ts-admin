import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
// import configureStore from './stores'
import store from './stores'
import * as serviceWorker from './serviceWorker'
import './styles/main.less'
import 'nprogress/nprogress.css'
import App from './App'
import './mock'

// const store = configureStore()

// const render = (Router: React.FC) => {
//   ReactDOM.render(
//     <Provider store={store}>
//       <Router />
//     </Provider>,
//     document.getElementById('root')
//   )
// }

// render(App)

// hmr enable
// if (module.hot && process.env.NODE_ENV === 'development') {
//   module.hot.accept('./App', () => {
//     const Router = require('./App').default
//     render(Router)
//   })
// }

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
