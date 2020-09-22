import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { Button } from 'reactstrap';
import { useNavigateToRoute } from '../../navigation/hooks';
import ROUTES from '../../navigation/routes';

const LoginOrSignUpModal = ({ isVisible, toggle }: { isVisible: boolean; toggle: () => void }) => {
  const login = useNavigateToRoute(ROUTES.LOGIN);
  const signup = useNavigateToRoute(ROUTES.REGISTER);
  return (
    <Dialog open={isVisible} onClose={toggle}>
      <DialogTitle>Please sign up or login before saving your marksheet</DialogTitle>
      <DialogContent>
        <p>Please create an account or login before saving your marksheets</p>
      </DialogContent>
      <DialogActions>
        <Button className="btn-round ml-1" color="primary" type="button" onClick={signup}>
          Sign up
        </Button>
        <Button className="btn-round ml-1" color="primary" type="button" onClick={login}>
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginOrSignUpModal;
