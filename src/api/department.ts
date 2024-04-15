import axios from 'axios';
import qs from 'query-string';

export interface Department {
  departmentNo: number;
  departmentName: string;
}

export function getDepartmentList() {
  return axios.post<Department[]>('/api/department/list');
}

export interface DepartmentInfo {
  departmentName: string;
  manager: string;
  managerPhone: string;
  peopleNum: number;
}

export interface DepartmentParams extends Partial<DepartmentInfo>{
  current: number;
  pageSize: number;
}

export interface DepartmentListRes {
  list: DepartmentInfo[];
  total: number;
}

export function queryDepartmentList(params: DepartmentParams) {
  return axios.get<DepartmentListRes>('/api/list/department', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
