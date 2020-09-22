import React, { useEffect, useState } from 'react';
import { Container, Table } from 'reactstrap';
import { map } from 'lodash';
import getApi from '../../api';
import { UserInfo } from '../../store/ducks/auth';

const AdminTable: React.FC = () => {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const fetchUsers = async () => {
    const response = await getApi().get('/user');
    setUsers(response.data);
  };
  useEffect(() => {
    fetchUsers().then();
  }, []);
  return (
    <div className="page-header bg-white justify-content-start d-flex align-items-start flex-column pt-5">
      <Container className="mt-5">
        <h4 className="font-weight-bold">Users</h4>
      </Container>
      <Container className="mt-3">
        <Table className="table">
          <thead className="thead-dark">
            <th>Username</th>
            <th>Role</th>
            <th>Id</th>
          </thead>
          <tbody>
            {map(users, (user, i) => (
              <tr className={i % 2 !== 0 ? 'table-dark' : ''} key={user.id}>
                <th>{user.username}</th>
                <th>{user.role}</th>
                <th>{user.id}</th>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default AdminTable;
