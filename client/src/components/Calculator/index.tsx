import React, { useCallback, useEffect, useState } from 'react';
import { Formik, FormikValues, useFormikContext } from 'formik';
import { get, sumBy, map, isEmpty } from 'lodash';
import { object, number, string, array } from 'yup';
import classnames from 'classnames';
import { Button, Col, Row } from 'reactstrap';
import useIsMobile from '../../hooks/use-is-mobile';
import RenderForm from './Form';
import useMarksheet from '../../store/ducks/marksheet/hooks/useMarksheet';
import { useMarksheetList, useMarksheetLoading, useSaveMarksheetStart } from '../../store/ducks/marksheet/hooks';
import LoginOrSignUpModal from '../LoginOrSignUpBeforeSaveMarksheet';
import { useIsVisible } from '../../hooks';
import { useHasUser } from '../../store/ducks/auth/hooks';

interface MarksheetRow {
  name: string;
  value: number;
  percent: number;
}

const initialValues = {
  rows: [
    {
      name: '',
      value: 0,
      percent: 0,
    },
  ],
  name: 'New Marksheet',
  id: 'NEW',
};

const validationSchema = object().shape({
  rows: array()
    .of(
      object().shape({
        name: string().required('Field is required').nullable(),
        value: number()
          .required('Field is required')
          .min(0, 'Must be between 0 and 100')
          .max(100, 'Must be between 0 and 100')
          .nullable(),
        percent: number()
          .required('Field is required')
          .min(0, 'Must be between 0 and 100')
          .max(100, 'Must be between 0 and 100')
          .nullable(),
      }),
    )
    .ensure(),
});

const Form = ({ clear }: { clear: () => void }) => {
  const { submitForm } = useFormikContext();
  const isMobile = useIsMobile();
  return (
    <>
      <div
        className={classnames('bg-dark p-5 rounded mt-md-5', {
          'w-75': !isMobile,
        })}
      >
        <Button className="btn-round ml-1" color="info" type="button" onClick={clear}>
          Clear
        </Button>
        <RenderForm />
        <Row className="mb-2 mt-2 justify-content-center">
          <Button className="btn-round ml-1" color="primary" type="button" onClick={submitForm}>
            Calculate
          </Button>
        </Row>
      </div>
    </>
  );
};

const Result = ({ result, combined }: { result: number | null | string; combined: number | null | string }) => {
  useEffect(() => {
    const element = document.getElementById('result');
    if (element) {
      window.scrollTo({
        top: 400,
        behavior: 'smooth',
      });
    }
  }, [result, combined]);
  return (
    <div className="bg-primary p-5 rounded m-md-5 text-white mb-5" id="result">
      <h5 className="font-weight-bold m-0">{`According to the numbers you entered, you have an average grade of ${result} on the assignment you have completed so far, and that assignment’s weight is ${combined} percent.`}</h5>
    </div>
  );
};

type Values = FormikValues;
const useValues = () => {
  const [values, setValues] = useState<Values>(initialValues);
  const marksheet = useMarksheet();
  const list = useMarksheetList();

  const clear = useCallback(() => {
    setValues(initialValues);
  }, []);
  useEffect(() => {
    if (marksheet?.list) {
      setValues({
        rows: map(marksheet.list, item => ({
          name: item.name,
          value: item.value,
          percent: item.percent,
          id: item.id,
        })),
        name: marksheet.name,
        id: marksheet.id,
      });
    } else if (list[0] && list[0].list) {
      setValues({
        rows: map(list[0].list, item => ({
          name: item.name,
          value: item.value,
          percent: item.percent,
          id: item.id,
        })),
        name: list[0].name,
        id: list[0].id,
      });
    }
  }, [list, marksheet]);
  return { values, clear };
};

const SaveSection = () => {
  const isMobile = useIsMobile();
  const { isVisible, toggle } = useIsVisible();
  const { values, errors } = useFormikContext();
  const [name, setName] = useState(values.name);
  const saveMarksheet = useSaveMarksheetStart();
  const hasUser = useHasUser();
  const onTryToSave = useCallback(() => {
    if (!hasUser) {
      toggle();
      return;
    }
    if (!isEmpty(errors) || name === 'New Marksheet') {
      alert('Fix the errors before save and gave a name to the marksheet');
      return;
    }
    if (values.id !== 'NEW') {
      // EDIT
      saveMarksheet({ rows: values.rows, name, id: values.id });
    } else {
      // NEW
      saveMarksheet({ rows: values.rows, name });
    }
  }, [errors, hasUser, name, saveMarksheet, toggle, values.id, values.rows]);

  useEffect(() => {
    setName(values.name);
  }, [values.name]);
  return (
    <Row className="mb-2 justify-content-between">
      <LoginOrSignUpModal isVisible={isVisible} toggle={toggle} />
      <Col className="d-flex justify-content-start p-4 flex-column">
        <h6 className="text-center font-weight-bold mb-2">Name your marksheet</h6>
        <input
          className="p-2"
          value={name === 'New Marksheet' ? '' : name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
        />
      </Col>
      <Col
        className={classnames('align-content-end d-flex p-5', {
          'justify-content-end': !isMobile,
          'justify-content-center': isMobile,
        })}
      >
        <Button className="btn-round ml-1" color="primary" type="button" onClick={onTryToSave} disabled={!hasUser}>
          <i className="fa fa-save mr-1" />
          Save Marksheet
        </Button>
        {!hasUser && (
          <p className="figure-caption info position-absolute" style={{ bottom: 0 }}>
            You need to create an account or login to save your marksheets
          </p>
        )}
      </Col>
    </Row>
  );
};
const Calculator: React.FC = () => {
  const [result, setResult] = useState<string | number | null>(null);
  const [combined, setCombined] = useState<string | number | null>(null);
  const [, setMarksheet] = useState<MarksheetRow[] | null>(null);
  const onSuccessCallback = useCallback(vl => {
    const rows = get(vl, 'rows');
    const sum = sumBy(rows, (row: MarksheetRow) => {
      return row.value * (row.percent / 100);
    });
    const comb = sumBy(rows, (row: MarksheetRow) => {
      return Number(row.percent);
    });
    setCombined(comb ? comb.toFixed(3) : null);
    setResult(sum.toFixed(3));
    setMarksheet(rows);
  }, []);
  const { values, clear } = useValues();
  const isLoading = useMarksheetLoading();
  const isMobile = useIsMobile();
  return (
    <Formik initialValues={values} validationSchema={validationSchema} onSubmit={onSuccessCallback} enableReinitialize>
      <div className="bg-white justify-content-start d-flex align-items-center flex-column pt-5 mt-5">
        {isLoading && <h6 className="mt-5">...Loading</h6>}
        {!isLoading && (
          <>
            <Form clear={clear} />
            <div
              className={classnames('bg-light p-1 rounded mt-2 mb-1', {
                'w-75': !isMobile,
              })}
            >
              <SaveSection />
            </div>
          </>
        )}
        {!isLoading && result && <Result result={result} combined={combined} />}
      </div>
    </Formik>
  );
};

export default Calculator;
