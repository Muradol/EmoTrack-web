import axios from 'axios';
import qs from 'query-string';

export interface Report {
  reportNo: number;
  reportDate: string;
  // Todo: reportVal should be changed to the actual report content
  reportVal: string;
}

export function getReportList() {
  return axios.post<Report[]>('/api/report/list');
}

export interface ReportInfo {
  startDate: string;
  endDate: string;
}

export interface ReportParams extends Partial<ReportInfo> {
  current: number;
  pageSize: number;
}

export interface ReporttListRes {
  list: Report[];
  total: number;
}

export function queryReportList(params: ReportParams) {
  return axios.get<ReporttListRes>('/api/list/report', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export interface ReportUploadForm {
  departmentName: string;
  manager: string;
  managerPhone: string;
}

// Todo: api should be change
export function createReport(data: ReportUploadForm) {
  return axios.post('/api/department/create', data);
}
