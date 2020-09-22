import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Login from '../pages/login';
import ROUTES, { history } from './routes';
import NotFound from '../pages/not-found';
import Index from '../pages/index';
import RegisterPage from '../pages/register';
import HelpfulGuides from '../pages/helpful-guides';
import PrivacyPolice from '../pages/privacy-policy';
import ContactUs from '../pages/contact-us';
import SavedWork from '../pages/saved-work';
import Admin from '../pages/admin';
import ResetPassword from '../pages/reset-password';

const NavigationContainer: React.FC = () => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path={ROUTES.LOGIN}>
          <Login />
        </Route>
        <Route path={ROUTES.RESET_PASSWORD}>
          <ResetPassword />
        </Route>
        <Route path={ROUTES.ADMIN}>
          <Admin />
        </Route>
        <Route path={ROUTES.HELPFUL_GUIDES}>
          <HelpfulGuides />
        </Route>
        <Route path={ROUTES.PRIVACY_POLICY}>
          <PrivacyPolice />
        </Route>
        <Route path={ROUTES.SAVED_WORK}>
          <SavedWork />
        </Route>
        <Route path={ROUTES.CONTACT_US}>
          <ContactUs />
        </Route>
        <Route path={ROUTES.REGISTER}>
          <RegisterPage />
        </Route>
        <Route exact path={ROUTES.INDEX}>
          <Index />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </ConnectedRouter>
  );
};

export default NavigationContainer;
