import React from 'react';
import { Col } from 'reactstrap';
import DemoFooter from '../../components/Footers/DemoFooter';
import IndexNavbar from '../../components/Navbars/IndexNavbar';
// @ts-ignore
import image from './contact-us.jpg';
import useIsMobile from '../../hooks/use-is-mobile';

const ContactUs: React.FC = () => {
  const isMobile = useIsMobile();
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
      <div className="bg-white justify-content-start d-flex align-items-start flex-column pt-md-5 m-0 mb-md-5">
        <div
          className="vw-100 d-flex justify-content-center align-items-center text-light"
          style={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            width: '100vw',
            height: isMobile ? 100 : 400,
            marginTop: isMobile ? 100 : 50,
          }}
        >
          {/*{isMobile ? (*/}
          {/*  <h4 className="font-weight-bold text-dark">Contact us</h4>*/}
          {/*) : (*/}
          {/*  <h1 className="font-weight-bold text-white pb-5 mb-5">Contact us</h1>*/}
          {/*)}*/}
        </div>
        <Col className="text-center mt-5 mb-5">
          <h6 className="font-weight-bold">Do you have any questions or concerns?</h6>
          <h6 className="font-weight-bold">Get in touch with us!</h6>
          <h6 className="font-weight-bold">The CalculateMate team can be contacted via email at:</h6>
          <a href="mailto:calculatemateweb@gmail.com">
            <h6 className="text-lowercase">calculatemateweb@gmail.com</h6>
          </a>
          <h5>Happy Calculating, Mate!</h5>
        </Col>
      </div>
      <DemoFooter />
    </>
  );
};

export default ContactUs;
