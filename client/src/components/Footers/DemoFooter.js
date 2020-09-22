import React from 'react';
import { Row, Container, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import ROUTES from '../../navigation/routes';
import { useScrollTop } from '../../navigation/hooks';
import useIsMobile from '../../hooks/use-is-mobile';

function DemoFooter() {
  const scroll = useScrollTop();
  const isMobile = useIsMobile();
  return (
    <footer className="footer footer-black footer-black">
      <Container>
        {isMobile ? (
          <Col>
            <Col className="credits mr-auto mt-auto" onClick={scroll}>
              <span className="copyright">
                Go Top <i className="fa fa-arrow-up" />
              </span>
            </Col>
            <Col className="justify-content-end w-50">
              <div className="credits m-0">
                <Link to={ROUTES.INDEX}>Home</Link>
              </div>
              <div className="credits m-0">
                <Link to={ROUTES.LOGIN}>Login</Link>
              </div>
              <div className="credits m-0">
                <Link to={ROUTES.REGISTER}>Sign Up</Link>
              </div>
              <div className="credits m-0">
                <Link to={ROUTES.HELPFUL_GUIDES}>Helpful Guides</Link>
              </div>
              <div className="credits m-0">
                <Link to={ROUTES.PRIVACY_POLICY}>Privacy Policy</Link>
              </div>
              <div className="credits m-0">
                <Link to={ROUTES.CONTACT_US}>Contact Us</Link>
              </div>
            </Col>
            <Col className="credits mr-auto mt-auto">
              <span className="copyright">
                CalculateMate © {new Date().getFullYear()}, made with <i className="fa fa-heart heart" />
              </span>
            </Col>
          </Col>
        ) : (
          <Row>
            <Col className="credits mr-auto mt-auto">
              <span className="copyright">
                CalculateMate © {new Date().getFullYear()}, made with <i className="fa fa-heart heart" />
              </span>
            </Col>
            <Col className="justify-content-end w-50">
              <div className="credits ml-auto w-50">
                <Link to={ROUTES.INDEX}>Home</Link>
              </div>
              <div className="credits ml-auto w-50">
                <Link to={ROUTES.LOGIN}>Login</Link>
              </div>
              <div className="credits ml-auto w-50">
                <Link to={ROUTES.REGISTER}>Sign Up</Link>
              </div>
            </Col>
            <Col>
              <div className="credits m-0">
                <Link to={ROUTES.HELPFUL_GUIDES}>Helpful Guides</Link>
              </div>
              <div className="credits m-0">
                <Link to={ROUTES.PRIVACY_POLICY}>Privacy Policy</Link>
              </div>
              <div className="credits m-0">
                <Link to={ROUTES.CONTACT_US}>Contact Us</Link>
              </div>
            </Col>
            <Col className="credits mr-auto mt-auto" onClick={scroll}>
              <span className="copyright">
                Go Top <i className="fa fa-arrow-up" />
              </span>
            </Col>
          </Row>
        )}
      </Container>
    </footer>
  );
}

export default DemoFooter;
