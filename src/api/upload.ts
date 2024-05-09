import axios from 'axios';
import { LoginData, LoginRes } from '@/api/user';

const instance = axios.create({
  // Todo: 联系后端人员，确认需要请求的IP地址和端口
  baseURL: 'http://8.134.248.200:5000',
});

export function uploadPhoto(photo: File) {
  return instance.post<File>('/analyze-emotion', photo);
}

export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/user/login', data);
}
