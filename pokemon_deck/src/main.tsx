import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/styles/main.css';
import { Provider } from "react-redux"
import { BrowserRouter } from 'react-router-dom';
import store from './store/store.ts';

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.createRoot(document.getElementById('root')!).render(app)
