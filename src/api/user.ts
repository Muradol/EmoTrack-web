import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  employeePhoneNumber: string;
  employeePassword: string;
}

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

// 修改 login 函数，模拟前端静态登录
export function login(data: LoginData): Promise<LoginRes> {
  return new Promise((resolve, reject) => {
    // 默认账号和密码
    const defaultUsername = 'admin';
    const defaultPassword = '123456';

    // 检查输入的账号和密码是否与默认值匹配
    if (data.employeePhoneNumber === defaultUsername && data.employeePassword === defaultPassword) {
      // 模拟登录成功，返回一个 token
      resolve({
        token: 'fake-token', // 静态登录返回的假 token
      });
    } else {
      // 模拟登录失败
      reject(new Error('账号或密码错误'));
    }
  });
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
