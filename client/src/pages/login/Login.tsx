import React from 'react';
import { Button, Card, Form } from 'reactstrap';
import FormikInput from '../../components/FormikInput';
import { Formik, useFormikContext } from 'formik';
import { object, string } from 'yup';
import { useLoginLoading, useLoginStart } from '../../store/ducks/auth/hooks';
import { useNavigateToRoute } from '../../navigation/hooks';
import ROUTES from '../../navigation/routes';

const initialValues = {
  username: '',
  password: '',
};

const validation = object().shape({
  username: string().required('Field is required').nullable(),
  password: string().required('Field is required').nullable(),
});

const LoginButton = () => {
  const isLoadingAuth = useLoginLoading();
  const { submitForm } = useFormikContext();
  return (
    <Button block className="btn-round" color="primary" type="button" onClick={submitForm} disabled={isLoadingAuth}>
      Login
    </Button>
  );
};
const Login = () => {
  const loginStart = useLoginStart();
  const navToSignUp = useNavigateToRoute(ROUTES.REGISTER);
  const resetPassword = useNavigateToRoute(ROUTES.RESET_PASSWORD);
  return (
    <Formik initialValues={initialValues} validationSchema={validation} onSubmit={loginStart}>
      <Card className="p-5 ml-auto mr-auto bg-dark">
        <h5 className="title mx-auto text-white">Welcome Back!</h5>
        <Form className="register-form">
          <label>Email address</label>
          <FormikInput placeholder="Email address" fieldPath="username" />
          <label>Password</label>
          <FormikInput placeholder="Password" type="password" fieldPath="password" />
          <LoginButton />
        </Form>
        <div className="forgot">
          <Button className="btn-link w-100 mt-3" color="danger" onClick={navToSignUp}>
            Dont have an account? Sign Up
          </Button>
        </div>
        <div className="forgot align-content-center">
          <Button className="btn-link w-100 mt-3" color="danger" href="#pablo" onClick={resetPassword}>
            Forgot password?
          </Button>
        </div>
      </Card>
    </Formik>
  );
};

export default Login;
