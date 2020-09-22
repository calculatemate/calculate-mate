import React from 'react';
import { Container } from 'reactstrap';
import HTMLRenderer from 'react-html-renderer';
import DemoFooter from '../../components/Footers/DemoFooter';
import IndexNavbar from '../../components/Navbars/IndexNavbar';
import html from './html';

const HelpfulGuides = () => {
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
        <Container className="mt-5 pt-5">
          <HTMLRenderer html={html} />
        </Container>
      </div>
      <DemoFooter />
    </>
  );
};

export default HelpfulGuides;
