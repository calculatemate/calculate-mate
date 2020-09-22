import React from 'react';
import { Col, Container } from 'reactstrap';
import classnames from 'classnames';
import useIsMobile from '../../hooks/use-is-mobile';

const Instructions: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <div
      className={classnames('bg-white rounded text-white', {
        'm-5': !isMobile,
      })}
    >
      <div className="bg-dark p-md-5 rounded m-md-5 text-white mb-5">
        <Col className="pb-5 pt-5">
          <h4 className="font-weight-bold m-0 text-center mb-5">Instructions</h4>
          <Container>
            <ul className="mb-5">
              <li className="mt-2 mb-2">
                <p>
                  Type in the grades you’ve received, along with the weights they’ll have in the determination of your
                  overall average.
                </p>
              </li>
              <li className="mt-2 mb-2">
                <p>
                  Every grade you enter must be a non-negative number (0 - 100), and every percentage you enter must be
                  a positive number.
                </p>
              </li>
              <li className="mt-2 mb-2">
                <p>
                  If you wish to save your grades, click on the "Save MarkSheet" button at the bottom right-hand side of
                  this page.
                </p>
              </li>
              <li className="mt-2 mb-2">
                <p>
                  Provide a name for your MarkSheet ONLY if you wish to save your calculations. Otherwise, you may leave
                  the name blank.
                </p>
              </li>
            </ul>
          </Container>
        </Col>
      </div>
    </div>
  );
};

export default Instructions;
