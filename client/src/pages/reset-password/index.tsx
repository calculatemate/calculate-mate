import React, { useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import qs from 'query-string';
import { useLocation } from 'react-router';
import { isEmpty } from 'lodash';
import DemoFooter from '../../components/Footers/DemoFooter';
import IndexNavbar from '../../components/Navbars/IndexNavbar';
import { useAuthPages } from '../../hooks';
import ResetPasswordCard from './ResetPassword';
import ChangePassword from './ChangePassword';

const ResetPassword: React.FC = () => {
  document.documentElement.classList.remove('nav-open');
  React.useEffect(() => {
    document.body.classList.add('profile-page');
    return function cleanup() {
      document.body.classList.remove('profile-page');
    };
  });
  useAuthPages();
  const params = useLocation();
  return (
    <>
      <IndexNavbar />
      <div className="bg-white justify-content-start d-flex align-items-start flex-column pt-md-5 m-0 mb-md-5">
        <Container className="mt-5 pt-5">
          <Row>
            <Col className="ml-auto mr-auto" lg="5">
              {isEmpty(qs.parse(params.search)) ? <ResetPasswordCard /> : <ChangePassword />}
            </Col>
          </Row>
        </Container>
      </div>
      <DemoFooter />
    </>
  );
};

export default ResetPassword;
