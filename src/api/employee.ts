import axios from 'axios';
import qs from 'query-string';

export interface EmployeeRecord {
  id: string;
  name: string;
  phoneNumber: string;
  birthday: Date;
  gender: number;
  departmentNo: number;
}

export interface EmployeeFilter {
  id: string;
  number: number;
  name: string;
  contentType: 'img' | 'horizontalVideo' | 'verticalVideo';
  filterType: 'A' | 'B';
  count: number;
  status: 'online' | 'offline';
  createdTime: string;
}

export interface PolicyParams extends Partial<EmployeeFilter> {
  current: number;
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

export function queryInspectionList() {
  return axios.get('/api/list/quality-inspection');
}

export function queryTheServiceList() {
  return axios.get('/api/list/the-service');
}

export function queryRulesPresetList() {
  return axios.get('/api/list/rules-preset');
}
