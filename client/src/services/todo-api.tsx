import axios from 'axios';

import { ITodo } from '../models/todo';

class TodoApi {
  private static get _baseUrl() {
    const { REACT_APP_API_URL } = process.env;

    return `${REACT_APP_API_URL}/todos`;
  }

  static get() {
    return axios.get<ITodo[]>(this._baseUrl);
  }

  static add(dto: Omit<ITodo, 'id'>) {
    return axios.post<ITodo>(this._baseUrl, dto);
  }

  static update(id: string, dto: Partial<ITodo>) {
    return axios.patch<ITodo>(`${this._baseUrl}/${id}`, dto);
  }

  static remove(id: string) {
    return axios.delete<unknown>(`${this._baseUrl}/${id}`);
  }
}

export default TodoApi;
