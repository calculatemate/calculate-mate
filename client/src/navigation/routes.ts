import { createBrowserHistory } from 'history';

export const BASENAME = '/';

const ROUTES = {
  INDEX: `/`,
  LANDING_PAGE: `/landing-page`,
  PRIVACY_POLICY: `/privacy-policy`,
  CONTACT_US: `/contact-us`,
  PROFILE: `/profile`,
  SAVED_WORK: `/saved-work`,
  HELPFUL_GUIDES: `/helpful-guides`,
  REGISTER: `/register`,
  LOGIN: `/login`,
  ADMIN: `/admin`,
  RESET_PASSWORD: `/reset-password`,
};

export const history = createBrowserHistory({
  basename: BASENAME,
});

export default ROUTES;
