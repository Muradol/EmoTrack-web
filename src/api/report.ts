import axios from 'axios';
import qs from 'query-string';

export interface Report {
  reportId: number;
  recordTime: string;
  warningType: number;
  emotionData: string;
  employeeName: string;
  employeePhoneNumber: string;
  suggestion: string;
}

export function getReportList() {
  return axios.post<Report[]>('/api/report/list');
}

export interface ReportInfo {
  startDate: string;
  endDate: string;
}

export interface ReportParams extends Partial<ReportInfo> {
  pageNum: number;
  pageSize: number;
  employeeId: number;
}

export interface ReporttListRes {
  items: Report[];
  total: number;
}

export function queryReportList(params: ReportParams) {
  return axios.get<ReporttListRes>('/emotion/emo_list', {
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
