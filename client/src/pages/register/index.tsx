import React from 'react';
import { Card, Container, Row, Col } from 'reactstrap';
import IndexNavbar from '../../components/Navbars/IndexNavbar';
import DemoFooter from '../../components/Footers/DemoFooter';
import { useAuthPages } from '../../hooks';
// @ts-ignore
import image from './image.png';
import RegisterCard from './RegisterCard';

const RegisterPage = () => {
  document.documentElement.classList.remove('nav-open');
  React.useEffect(() => {
    document.body.classList.add('register-page');
    return function cleanup() {
      document.body.classList.remove('register-page');
    };
  });
  useAuthPages();
  return (
    <>
      <IndexNavbar />
      <div className="bg-white justify-content-start d-flex align-items-start flex-column pt-md-5 m-0 mb-md-5">
        <Container className="mt-5 pt-5">
          <Row>
            <Col lg="5">
              <RegisterCard />
            </Col>
            <Col>
              <Card className="bg-dark w-100 m-3 text-light">
                <div
                  className="p-5 rounded bg-dark justify-content-center align-items-center d-flex"
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    height: 550,
                  }}
                >
                  <Col className="text-center small">
                    <h5 className="font-weight-bold">
                      Having trouble trying to figure out what your next result would be?
                    </h5>
                    <h6>CalculateMate is here to make it easy for you</h6>
                  </Col>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <DemoFooter />
    </>
  );
};

export default RegisterPage;
