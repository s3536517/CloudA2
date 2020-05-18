import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import Navbar from './components/navbar'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './store'

const RoutedApp = () => (
  <BrowserRouter>
    <Provider store={configureStore().store}>
      <PersistGate loading={null} persistor={configureStore().persistor}>
        <Navbar />
      </PersistGate>
    </Provider>
  </BrowserRouter>
)

ReactDOM.render(<RoutedApp />, document.getElementById('root'))
