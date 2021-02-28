import React from 'react'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'
import { App } from '@/pages/home'
import '@/styles/index.scss'

ReactDOM.render(
  <RecoilRoot>
    <React.StrictMode>
      <React.Suspense fallback={<div>Loading...</div>}>
        <App />
      </React.Suspense>
    </React.StrictMode>
  </RecoilRoot>,
  document.getElementById('root')
)
