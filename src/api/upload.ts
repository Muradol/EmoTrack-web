import axios from 'axios';
import { LoginData, LoginRes } from '@/api/user';

export interface emotionData{
  code: number;
  message: string;
  data: string;
}

// Todo: 添加参数token
export function uploadPhoto(photo: File) {
  const formData = new FormData();
  formData.append('file', photo);
  return axios.post<emotionData>('/api/emotion/detect', formData, {
    headers: {
      Authorization:
      '',
      Accept: '*/*',
    },
  });
}

export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/user/login', data);
}
