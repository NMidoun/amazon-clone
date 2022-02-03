import { render } from 'react-dom';
import store from "./app/store";
import { Provider } from 'react-redux';
import { FirestoreProvider } from './contexts/FirestoreContext';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';

render(
  <Provider store={store}>
    <FirestoreProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </FirestoreProvider>
  </Provider>,
  document.getElementById("root")
);