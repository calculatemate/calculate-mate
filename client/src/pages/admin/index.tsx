import React from 'react';
import IndexNavbar from '../../components/Navbars/IndexNavbar';
import DemoFooter from '../../components/Footers/DemoFooter';

import AdminTable from '../../components/AdminTable';
import { useIsAdmin } from '../../store/ducks/auth/hooks';
import { useNavigateToRoute } from '../../navigation/hooks';
import ROUTES from '../../navigation/routes';

function Admin() {
  document.documentElement.classList.remove('nav-open');
  const isAdmin = useIsAdmin();
  const navToIndex = useNavigateToRoute(ROUTES.INDEX);
  React.useEffect(() => {
    document.body.classList.add('index');
    if (!isAdmin) navToIndex();
    return function cleanup() {
      document.body.classList.remove('index');
    };
  }, [isAdmin, navToIndex]);
  return (
    <>
      <IndexNavbar />
      <div className="main">
        <AdminTable />
        <DemoFooter />
      </div>
    </>
  );
}

export default Admin;
