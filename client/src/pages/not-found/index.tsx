import React from 'react';
import { Row } from 'reactstrap';

// core components
import { Link } from 'react-router-dom';
import DemoFooter from '../../components/Footers/DemoFooter';
import ROUTES from '../../navigation/routes';
import IndexNavbar from '../../components/Navbars/IndexNavbar';

const NotFound = () => {
  document.documentElement.classList.remove('nav-open');
  React.useEffect(() => {
    document.body.classList.add('profile-page');
    return function cleanup() {
      document.body.classList.remove('profile-page');
    };
  });
  return (
    <>
      <IndexNavbar />
      <div className="content-center">
        <Row className="m-5 p-5 mb-0 pb-0 min-vh-100">
          <h1>Ops!Not found...</h1>
          <Link to={ROUTES.INDEX}>
            <h1>Back to the main page.</h1>
          </Link>
        </Row>
      </div>
      <DemoFooter />
    </>
  );
};

export default NotFound;
