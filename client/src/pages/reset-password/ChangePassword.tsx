import React, { useState } from 'react';
import { Button, Card, Form } from 'reactstrap';
import { Formik, useFormikContext } from 'formik';
import { object, string } from 'yup';
import { useLocation } from 'react-router';
import qs from 'query-string';
import FormikInput from '../../components/FormikInput';
import auth from '../../services/auth';

const initialValues = {
  password: '',
  passwordConfirmation: '',
};

const validation = object().shape({
  password: string().required('Field is required').nullable().min(4, 'At least 4 characters'),
  passwordConfirmation: string()
    .required('Field is required')
    .nullable()
    .test('passwordConfirmation', 'Passwords should match', function (vl) {
      return this.parent.password === vl;
    }),
});

const LoginButton = ({ disabled }: { disabled: boolean }) => {
  const { submitForm } = useFormikContext();
  return (
    <Button block className="btn-round" color="primary" type="button" onClick={submitForm} disabled={disabled}>
      Send email
    </Button>
  );
};
const ChangePassword = () => {
  const params = useLocation();
  const { userId, token } = qs.parse(params.search);

  const id: string = userId as string;
  const tk: string = token as string;

  const [hasSent, setHasSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const send = async (vl: Record<string, any>) => {
    setHasSent(false);
    setLoading(true);
    await auth.changePassword({ userId: id, newPassword: vl.password, token: tk });
    setHasSent(true);
    setLoading(false);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validation} onSubmit={send}>
      <Card className="p-5 ml-auto mr-auto bg-dark">
        <h5 className="title mx-auto text-white">{!hasSent ? 'Change Password' : 'Done!'}</h5>
        {!hasSent && (
          <Form className="register-form">
            <FormikInput placeholder="Password" fieldPath="password" />
            <FormikInput placeholder="Confirm password" fieldPath="passwordConfirmation" />
            <LoginButton disabled={loading} />
          </Form>
        )}
      </Card>
    </Formik>
  );
};

export default ChangePassword;
