import './assets/css/bootstrap.min.css';
import './assets/scss/paper-kit.scss';
import './assets/demo/demo.css';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import store, { persistor } from './store';
import NavigationContainer from './navigation';
import theme from './theme';
import { BASENAME } from './navigation/routes';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Router basename={BASENAME}>
            <NavigationContainer />
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
