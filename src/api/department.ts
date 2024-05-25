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
  departmentNo: number;
  departmentName: string;
  manager: string;
  managerPhone: string;
  peopleNum: number;
}

export interface DepartmentParams extends Partial<DepartmentInfo> {
  pageNum: number;
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

export interface DepartmentCreateForm {
  departmentName: string;
  manager: string;
  managerPhone: string;
}

// Todo: api should be change
export function createDepartment(data: DepartmentCreateForm) {
  return axios.post('/api/department/create', data);
}

export interface DepartmentUpdateForm {
  departmentNo: number;
  departmentName: string;
  manager: string;
  managerPhone: string;
}

// Todo: api should be change
export function updateDepartment(data: DepartmentUpdateForm) {
  return axios.post('/api/department/update', data);
}
