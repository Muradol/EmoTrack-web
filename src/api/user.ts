import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  employeePhoneNumber: string;
  employeePassword: string;
}
// Todo change
export interface RegisterData {
  username: string;
  password: string;
  phoneNumber: string;
  birthday: Date;
  gender: number;
  role: number;
  departmentNo: number;
}

export interface Password {
  old_password: string;
  new_password: string;
}

export interface LoginRes {
  token: string;
}
export function login(data: LoginData) {
  return axios.post<LoginRes>('/employeeBasic/login', data);
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  return axios.get<UserState>('/employeeBasic/info_bytoken');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}
export function updatePassword(data: Password) {
  return axios.put<Password>('/employeeBasic/change_password', data, {
    params: {
      old_password: data.old_password,
      new_password: data.new_password,
    },
  });
}

export function register(data: RegisterData) {
  return axios.post('/api/user/register', data);
}
