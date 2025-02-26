import axios from 'axios';
import qs from 'query-string';

export interface EmployeeRecord {
  id: string;
  name: string;
  phoneNumber: string;
  birthday: Date;
  gender: number;
  role: string;
  departmentNo: number;
}

export interface EmployeeFilter {
  name: string;
  role: string;
  departmentNo: number;
  phoneNumber: string;
  gender: number;
  birthday: string;
}

export interface PolicyParams extends Partial<EmployeeFilter> {
  pageNum: number;
  pageSize: number;
}

export interface PolicyListRes {
  list: EmployeeRecord[];
  total: number;
}

export function queryPolicyList(params: PolicyParams) {
  return axios.get<PolicyListRes>('/api/list/employee', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function uploadEmployees(File: File) {
  const formData = new FormData();
  formData.append('file', File);
  return axios.post('/employeeBasic/import_emp', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function queryPolicyList1(params: PolicyParams) {
  return axios.get<PolicyListRes>('/api/list/mock', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export interface getEmployeeInfoReq {
  phone: string;
}

export function getEmployeeInfo(params: getEmployeeInfoReq) {
  return axios.get<EmployeeRecord>('/api/employee/info', {
    params,
  });
}

export function queryInspectionList() {
  return axios.get('/api/list/quality-inspection');
}

export function queryTheServiceList() {
  return axios.get('/api/list/the-service');
}

export function queryRulesPresetList() {
  return axios.get('/api/list/rules-preset');
}
