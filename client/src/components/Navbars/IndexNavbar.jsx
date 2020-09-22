import React from 'react';
import classnames from 'classnames';
import { Collapse, NavbarBrand, Navbar, NavItem, Nav, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import Row from 'reactstrap/lib/Row';
import ROUTES from '../../navigation/routes';
import { useScrollToTopOnMount } from '../../navigation/hooks/useScrollTop';
import { useHasUser, useIsAdmin, useLogoutStart } from '../../store/ducks/auth/hooks';
import { useNavigateToRoute } from '../../navigation/hooks';

import logo from './logo.png';

function IndexNavbar() {
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  const hasUser = useHasUser();
  const isAdmin = useIsAdmin();
  const logoutStart = useLogoutStart();
  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle('nav-open');
  };
  const goToAdminPage = useNavigateToRoute(ROUTES.ADMIN);
  useScrollToTopOnMount();
  return (
    <Navbar className={classnames('fixed-top bg-primary vw-100')} expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand data-placement="bottom" href="/" title="CalculateMate" className="text-capitalize">
            <img src={logo} height={50} className="mr-2" />
            CalculateMate
          </NavbarBrand>
          <button
            type="button"
            aria-expanded={navbarCollapse}
            className={classnames('navbar-toggler navbar-toggler', {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse className="justify-content-end" navbar isOpen={navbarCollapse}>
          <Nav navbar>
            <NavItem>
              <div className="pt-3 pb-3 p-md-5">
                <Link
                  to={ROUTES.HELPFUL_GUIDES}
                  className={classnames('text-white font-weight-bold', {
                    'text-primary': navbarCollapse,
                  })}
                >
                  Helpful Guides
                </Link>
              </div>
            </NavItem>
            <NavItem>
              <div className="pt-3 pb-3 p-md-5">
                <Link
                  to={ROUTES.SAVED_WORK}
                  className={classnames('text-white font-weight-bold', {
                    'text-primary': navbarCollapse,
                  })}
                >
                  View Saved Work
                </Link>
              </div>
            </NavItem>
            {!hasUser ? (
              <>
                <NavItem>
                  <div className="pt-3 pb-3 p-md-5">
                    <Link
                      to={ROUTES.LOGIN}
                      className={classnames('text-white font-weight-bold', {
                        'text-primary': navbarCollapse,
                      })}
                    >
                      Login
                    </Link>
                  </div>
                </NavItem>
                <NavItem>
                  <div className="pt-3 pb-3 p-md-5 p-md-5">
                    <i
                      className={classnames('fa fa-lock text-white', {
                        'text-primary': navbarCollapse,
                      })}
                    />
                    <Link
                      to={ROUTES.REGISTER}
                      className={classnames('text-white font-weight-bold', {
                        'text-primary': navbarCollapse,
                      })}
                    >
                      Sign Up
                    </Link>
                  </div>
                </NavItem>
              </>
            ) : (
              <NavItem>
                <Row>
                  <div className="pt-3 pb-3 p-md-5 p-md-5">
                    {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
                    <a
                      className={classnames('text-white font-weight-bold', {
                        'text-primary': navbarCollapse,
                      })}
                      onClick={logoutStart}
                    >
                      Logout
                    </a>
                  </div>
                  {isAdmin && (
                    <div className="pt-3 pb-3 p-md-5 p-md-5 bg-info">
                      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
                      <a
                        className={classnames('text-danger font-weight-bold', {
                          'text-primary': navbarCollapse,
                        })}
                        onClick={goToAdminPage}
                      >
                        Admin
                      </a>
                    </div>
                  )}
                </Row>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default IndexNavbar;
