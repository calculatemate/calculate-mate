import React from 'react';
import { Button, Card, Col, Form } from 'reactstrap';
import { Formik, useFormikContext } from 'formik';
import FormikInput from '../../components/FormikInput';
import { useNavigateToRoute } from '../../navigation/hooks';
import ROUTES from '../../navigation/routes';
import useRegisterStart from '../../store/ducks/auth/hooks/useRegisterStart';
import { object, string } from 'yup';
import { useLoginLoading } from '../../store/ducks/auth/hooks';

const initialValues = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validation = object().shape({
  firstName: string().required('Field is required').nullable(),
  lastName: string().required('Field is required').nullable(),
  username: string().required('Field is required').nullable(),
  password: string().required('Field is required').nullable().min(4, 'At least 4 characters'),
  passwordConfirmation: string()
    .required('Field is required')
    .nullable()
    .test('passwordConfirmation', 'Passwords should match', function (vl) {
      return this.parent.password === vl;
    }),
});

const RegisterButton = () => {
  const { submitForm } = useFormikContext();
  const isLoadingAuth = useLoginLoading();
  return (
    <Button
      block
      className="btn-round mt-5"
      color="primary"
      type="button"
      onClick={submitForm}
      disabled={isLoadingAuth}
    >
      Register
    </Button>
  );
};

const RegisterCard = () => {
  const goToLogin = useNavigateToRoute(ROUTES.LOGIN);
  const registerStart = useRegisterStart();
  return (
    <Card className="m-1 bg-dark p-5 text-white">
      <Col className="mb-2 text-center">
        <h5 className="title mx-auto  text-white">Sign up Now!</h5>
        <p className="text-light">Nothing is better than easy calculations</p>
      </Col>
      <Formik initialValues={initialValues} validationSchema={validation} onSubmit={registerStart}>
        <Form className="register-form">
          <FormikInput fieldPath="firstName" placeholder="First Name" type="text" className="mt-1" />
          <FormikInput fieldPath="lastName" placeholder="Last Name" type="text" className="mt-1" />
          <FormikInput fieldPath="username" placeholder="Email" type="text" className="mt-1" />
          <FormikInput fieldPath="password" placeholder="Password" type="password" className="mt-1" />
          <FormikInput
            fieldPath="passwordConfirmation"
            placeholder="Confirm Password"
            type="password"
            className="mt-1"
          />
          <RegisterButton />
        </Form>
      </Formik>
      <div className="forgot align-content-center">
        <Button className="btn-link w-100 mt-3" color="danger" onClick={goToLogin}>
          Already have an account? Login
        </Button>
      </div>
    </Card>
  );
};

export default RegisterCard;
