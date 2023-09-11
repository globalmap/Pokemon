import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/styles/main.css';
import { Provider } from "react-redux"
import store from './store/store.ts';

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.createRoot(document.getElementById('root')!).render(app)
