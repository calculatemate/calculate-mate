import getApi from '../api';

export interface MarksheetItem {
  name: string;
  value: number;
  percent: number;
  id?: string;
}
export interface NewMarksheetParams {
  rows: MarksheetItem[];
  userId?: string;
  name: string;
  id?: string;
}
export interface ListAllParams {
  userId: string;
}
export interface DeleteParams {
  id: string;
}

const auth = {
  async newMarksheet({ rows, userId, name }: NewMarksheetParams): Promise<string> {
    const response = await getApi().post('/marksheet', {
      rows,
      userId,
      name,
    });
    return response.data;
  },
  async editMarksheet({ rows, name, id }: NewMarksheetParams): Promise<string> {
    const response = await getApi().patch(`/marksheet/${id}`, {
      rows,
      name,
    });
    return response.data;
  },
  async listAll({ userId }: ListAllParams): Promise<MarksheetItem> {
    const response = await getApi().get(`/marksheet?userId=${userId}`);
    return response.data;
  },
  async deleteMarksheet({ id }: DeleteParams): Promise<void> {
    const response = await getApi().delete(`/marksheet/${id}`);
    return response.data;
  },
};

export default auth;
