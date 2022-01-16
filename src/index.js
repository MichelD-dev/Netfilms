import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Profiler } from 'utils/Profiler'

ReactDOM.render(
  <React.StrictMode>
    <Profiler id='App' phases={['mount']}>
      <App />
    </Profiler>
  </React.StrictMode>,
  document.getElementById('root')
)
