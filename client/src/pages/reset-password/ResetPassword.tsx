import React, { useState } from 'react';
import { Button, Card, Form } from 'reactstrap';
import { Formik, useFormikContext } from 'formik';
import { object, string } from 'yup';
import FormikInput from '../../components/FormikInput';
import { useLoginLoading } from '../../store/ducks/auth/hooks';
import { useLocation } from 'react-router';
import qs from 'query-string';
import auth from '../../services/auth';

const initialValues = {
  email: '',
};

const validation = object().shape({
  email: string().required('Field is required').nullable(),
});

const LoginButton = ({ loading }: { loading: boolean }) => {
  const { submitForm } = useFormikContext();
  return (
    <Button block className="btn-round" color="primary" type="button" onClick={submitForm} disabled={loading}>
      Send email
    </Button>
  );
};
const ResetPassword = () => {
  const [hasSent, setHasSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const send = async (vl: Record<string, any>) => {
    setHasSent(false);
    setLoading(true);
    await auth.requestResetPassword({ username: vl.email });
    setHasSent(true);
    setLoading(false);
  };
  return (
    <Formik initialValues={initialValues} validationSchema={validation} onSubmit={send}>
      <Card className="p-5 ml-auto mr-auto bg-dark">
        <h5 className="title mx-auto text-white">{hasSent ? 'Check your e-mail' : 'Reset Password'}</h5>
        {!hasSent && (
          <Form className="register-form">
            <FormikInput placeholder="Email" fieldPath="email" />
            <LoginButton loading={loading} />
          </Form>
        )}
      </Card>
    </Formik>
  );
};

export default ResetPassword;
