import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store from './BLL/index.js'

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.getRegistration().then(function(registration) {
            if (!registration) {
                navigator.serviceWorker.register('/PWA/sw.js')
                // navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                        console.log('Service Worker registered with scope: ', registration.scope);
                    })
                    .catch(function(err) {
                        console.log('Service Worker registration failed: ', err);
                    });
            } else {
                console.log('Service Worker already exists');
            }
        }).catch(function(error) {
            console.error('Failed to check Service Worker status:', error);
        });
    });
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  

    <Provider store = {store}>
    <HashRouter>
    <App />
    </HashRouter>
    </Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
