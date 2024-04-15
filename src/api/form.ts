import axios from 'axios';

export interface BaseInfoModel {
  activityName: string;
  channelType: string;
  promotionTime: string[];
  promoteLink: string;
}
export interface ChannelInfoModel {
  advertisingSource: string;
  advertisingMedia: string;
  keyword: string[];
  pushNotify: boolean;
  advertisingContent: string;
}

export type UnitChannelModel = BaseInfoModel & ChannelInfoModel;

export function submitChannelForm(data: UnitChannelModel) {
  return axios.post('/api/channel-form/submit', { data });
}

export interface EmployeeBaseInfoModel {
  name: string;
  birthday: string;
  phoneNumber: string;
  gender: number;
}

export interface EmployeeWorkInfoModel {
  departmentNo: number;
  role: string;
}

export type UnitEmployeeModel = EmployeeBaseInfoModel & EmployeeWorkInfoModel;

// Todo: should be change
export function submitEmployeeForm(data: UnitEmployeeModel) {
  return axios.post('/api/channel-form/submit', { data });
}
