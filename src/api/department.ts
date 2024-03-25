import axios from 'axios';

export interface Department {
  departmentNo: number;
  departmentName: string;
}

export function getDepartmentList() {
  return axios.post<Department[]>('/api/department/list');
}
