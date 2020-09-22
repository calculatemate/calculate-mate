import React, { useCallback } from 'react';
import { Container, Table } from 'reactstrap';
import { map } from 'lodash';
import moment from 'moment';
import { IconButton } from '@material-ui/core';
import { useGetMarksheetStartOnMount } from '../../store/ducks/marksheet/hooks/useGetMarksheetStart';
import { useDeleteMarksheetStart, useMarksheetList, useMarksheetLoading } from '../../store/ducks/marksheet/hooks';
import { useSelectMarksheetAndNavigate } from '../../navigation/hooks';
import ROUTES from '../../navigation/routes';

const SavedWorkTable: React.FC = () => {
  useGetMarksheetStartOnMount();
  const list = useMarksheetList();
  const loading = useMarksheetLoading();
  const deleteMarksheet = useDeleteMarksheetStart();
  const navigateToIndex = useSelectMarksheetAndNavigate(ROUTES.INDEX);
  const getOnClick = useCallback(
    id => () => {
      deleteMarksheet({ id });
    },
    [deleteMarksheet],
  );

  const getOnSelect = useCallback(
    marksheet => () => {
      navigateToIndex(marksheet);
    },
    [navigateToIndex],
  );
  return (
    <div className="page-header bg-white justify-content-start d-flex align-items-start flex-column pt-5">
      <Container className="mt-5">
        <h4 className="font-weight-bold">Saved Work</h4>
      </Container>
      {list.length > 0 &&
        (!loading ? (
          <Container className="mt-3">
            <Table className="table">
              <thead className="thead-dark">
                <th>Name of Marksheet</th>
                <th>Grade Average</th>
                <th>Last edited</th>
              </thead>
              <tbody>
                {map(list, (item, i) => (
                  <tr className={i % 2 !== 0 ? 'table-dark' : ''} key={item.id}>
                    <th>
                      <IconButton size="small" onClick={getOnSelect(item)}>
                        <i className="fa fa-folder-open" />
                      </IconButton>
                      {item.name}
                    </th>
                    <th>{item.average}</th>
                    <th>
                      {moment(item.updatedAt).format('MM/DD/YYYY')}{' '}
                      <IconButton size="small" onClick={getOnClick(item.id)}>
                        <i className="fa fa-trash" />
                      </IconButton>
                    </th>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        ) : (
          <Container className="mt-3">
            <h6>...loading</h6>
          </Container>
        ))}
      {!loading && list.length === 0 && (
        <Container className="mt-3">
          <h6>Theres no marksheets yet</h6>
        </Container>
      )}
    </div>
  );
};

export default SavedWorkTable;
