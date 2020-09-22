import React from 'react';
import IndexNavbar from '../../components/Navbars/IndexNavbar';
import DemoFooter from '../../components/Footers/DemoFooter';
import Instructions from '../../components/Instructions';
import Calculator from '../../components/Calculator';

function Index() {
  document.documentElement.classList.remove('nav-open');
  React.useEffect(() => {
    document.body.classList.add('index');
    return function cleanup() {
      document.body.classList.remove('index');
    };
  });
  return (
    <>
      <IndexNavbar />
      <div className="main">
        <Calculator />
        <Instructions />
        <DemoFooter />
      </div>
    </>
  );
}

export default Index;
