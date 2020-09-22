import React from 'react';
import { Button, Col, Row } from 'reactstrap';

function IndexHeader() {
  return (
    <div className="page-header bg-white">
      <div className="content-center bg-white w-75">
        <div className="bg-dark p-5 rounded w-100">
          <Row className="mb-2 justify-content-between">
            <Col>
              <h4 className="text-white text-center font-weight-bold mb-2">Assessment</h4>
              <input className="p-2 w-100" />
            </Col>
            <Col className="text-center w-auto">
              <h4 className="text-white font-weight-bold mb-2">Grade</h4>
              <input className="p-2 w-100" type="number" min={0} />
            </Col>
            <Col className="text-center">
              <h4 className="text-white font-weight-bold mb-2">Weight (%)</h4>
              <input className="p-2 w-100" type="number" min={0} max={100} />
            </Col>
          </Row>
          <Row className="p-2">
            <Button className="btn-round ml-1" color="transparent" type="button">
              <i className="fa fa-plus mr-1" />
              Add another
            </Button>
          </Row>
          <Row className="mb-2 mt-2 justify-content-center">
            <Button className="btn-round ml-1" color="primary" type="button">
              Calculate
            </Button>
          </Row>
        </div>
        <div className="bg-light p-5 rounded w-100">
          <Row className="mb-2 justify-content-between">
            <Col className="d-flex justify-content-start p-4 flex-column">
              <h6 className="text-center font-weight-bold mb-2">Name your marksheet</h6>
              <input className="p-2" />
            </Col>
            <Col className="align-content-end justify-content-end d-flex p-5">
              <Button className="btn-round ml-1" color="primary" type="button">
                <i className="fa fa-save mr-1" />
                Save Marksheet
              </Button>
            </Col>
          </Row>
        </div>
        <div className="bg-primary p-5 rounded align-items-center justify-content-center d-flex m-5 text-white">
          <h4 className="font-weight-bold m-0">RESULT</h4>
        </div>
      </div>
    </div>
  );
}

export default IndexHeader;
