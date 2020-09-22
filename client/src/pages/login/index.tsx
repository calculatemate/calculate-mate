import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import DemoFooter from '../../components/Footers/DemoFooter';
import IndexNavbar from '../../components/Navbars/IndexNavbar';
import { useAuthPages } from '../../hooks';
import LoginCard from './Login';

const Login: React.FC = () => {
  document.documentElement.classList.remove('nav-open');
  React.useEffect(() => {
    document.body.classList.add('profile-page');
    return function cleanup() {
      document.body.classList.remove('profile-page');
    };
  });
  useAuthPages();
  return (
    <>
      <IndexNavbar />
      <div className="bg-white justify-content-start d-flex align-items-start flex-column pt-md-5 m-0 mb-md-5">
        <Container className="mt-5 pt-5">
          <Row>
            <Col className="ml-auto mr-auto" lg="5">
              <LoginCard />
            </Col>
          </Row>
        </Container>
      </div>
      <DemoFooter />
    </>
  );
};

export default Login;
