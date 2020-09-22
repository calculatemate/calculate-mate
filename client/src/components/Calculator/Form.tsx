import React from 'react';
import { FieldArray, useFormikContext } from 'formik';
import { map, get, size } from 'lodash';
import classnames from 'classnames';
import { Button, Col, Row } from 'reactstrap';
import { IconButton } from '@material-ui/core';
import useIsMobile from '../../hooks/use-is-mobile';
import FormikInput from '../FormikInput';

interface Props {
  helpers: any;
  index?: any;
  length?: number;
}

const AddButton = ({ helpers, length }: Props) => {
  return (
    <Row className="p-2">
      <Button
        className="btn-round ml-1"
        color="transparent"
        type="button"
        onClick={() => helpers.insert(length as number, { name: '', value: 0, percent: 0 })}
      >
        <i className="fa fa-plus mr-1" />
        Add another
      </Button>
    </Row>
  );
};

const Item = ({ helpers, index }: Props) => {
  const isMobile = useIsMobile();
  return (
    <>
      {!isMobile && (
        <div className="d-flex align-items-end mb-4" onClick={() => helpers.remove(index)}>
          <IconButton>
            <i className="fa fa-trash text-white align-items-center" />
          </IconButton>
        </div>
      )}
      <Col
        className={classnames({
          'p-0': isMobile,
        })}
      >
        {index === 0 && !isMobile && <h4 className="text-white text-center font-weight-bold mb-2">Assessment</h4>}
        {isMobile && (
          <Row className="text-center justify-content-center">
            <i
              className="fa fa-trash text-white align-items-center mr-auto position-absolute"
              style={{ left: 0 }}
              onClick={() => helpers.remove(index)}
            />
            <h6 className="text-white text-center font-weight-bold mb-2 ml-auto mr-auto">Assessment</h6>
          </Row>
        )}
        <FormikInput className="p-2 w-100" fieldPath={`rows.${index}.name`} />
      </Col>
      {isMobile ? (
        <Row>
          <Col className="text-center w-auto">
            {index === 0 && <h6 className="text-white font-weight-bold mb-2">Grade</h6>}{' '}
            <FormikInput className="p-2 w-100" fieldPath={`rows.${index}.value`} type="number" />
          </Col>
          <Col className="text-center">
            {index === 0 && <h6 className="text-white font-weight-bold mb-2">Weight (%)</h6>}{' '}
            <FormikInput className="p-2 w-100" fieldPath={`rows.${index}.percent`} type="number" />
          </Col>
        </Row>
      ) : (
        <>
          <Col className="text-center w-auto">
            {index === 0 && <h4 className="text-white font-weight-bold mb-2">Grade</h4>}{' '}
            <FormikInput className="p-2 w-100" fieldPath={`rows.${index}.value`} type="number" />
          </Col>
          <Col className="text-center">
            {index === 0 && <h4 className="text-white font-weight-bold mb-2">Weight (%)</h4>}{' '}
            <FormikInput className="p-2 w-100" fieldPath={`rows.${index}.percent`} type="number" />
          </Col>
        </>
      )}
    </>
  );
};
const RenderForm = () => {
  const { values } = useFormikContext();
  const rows = get(values, 'rows');
  const length = size(rows);
  const isMobile = useIsMobile();
  return (
    <FieldArray
      name="rows"
      render={helpers => (
        <>
          {map(rows, (item, i) => (
            <Row
              key={`rows.${i}`}
              className={classnames('mb-2 justify-content-between', {
                'flex-column': isMobile,
              })}
            >
              <Item helpers={helpers} index={i} />
            </Row>
          ))}
          <AddButton helpers={helpers} length={length} />
        </>
      )}
    />
  );
};

export default RenderForm;
