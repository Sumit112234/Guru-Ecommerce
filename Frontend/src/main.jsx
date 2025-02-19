import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Provider} from 'react-redux';
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import store from './redux/store.js';
import { UserProvider } from './context/userContext.jsx'

createRoot(document.getElementById('root')).render(
  
  <Provider store={store}>
    <UserProvider>

      <BrowserRouter>
        <App />
      </BrowserRouter>,
    </UserProvider>

  </Provider>
)
