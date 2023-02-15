import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DataProvider } from './context/DataProvider';
import {Provider} from 'react-redux'
import store from './store/store';
import { SocketProvider } from './context/SocketProvider';
import { PeerProvider } from './context/Peer';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <DataProvider>
      <SocketProvider>
        <PeerProvider>
       <App />
        </PeerProvider>
      </SocketProvider>
    </DataProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
