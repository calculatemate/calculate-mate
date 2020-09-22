import React from 'react';
import IndexNavbar from '../../components/Navbars/IndexNavbar';
import DemoFooter from '../../components/Footers/DemoFooter';

import SavedWorkTable from '../../components/SavedWorkTable';

function SavedWork() {
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
        <SavedWorkTable />
        <DemoFooter />
      </div>
    </>
  );
}

export default SavedWork;
