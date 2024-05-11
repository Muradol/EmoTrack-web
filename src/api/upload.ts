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
  return axios.post<File>('/api/emotion/detect', formData, {
    headers: {
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZUlkIjp7ImVtcGxveWVlSWQiOiI2IiwiZW1wbG95ZWVSb2xlIjoxfSwiZW1wbG95ZWVSb2xlIjp7ImVtcGxveWVlSWQiOiI2IiwiZW1wbG95ZWVSb2xlIjoxfSwiZXhwIjoxNzE1NDEzMjg4fQ._HGjo1wDqotRlUrI1yKaWKcSuLbCoLIhLzC2HcjTV4I',
      Accept: '*/*',
    },
  });
}

export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/user/login', data);
}
