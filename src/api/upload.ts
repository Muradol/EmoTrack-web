import axios from 'axios';
import { LoginData, LoginRes } from '@/api/user';

export interface emotionData{
  code: number;
  message: string;
  data: string;
}

// Todo: 添加参数token
export function uploadPhoto(photo: File) {
  localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZUlkIjp7ImVtcGxveWVlSWQiOiI2IiwiZW1wbG95ZWVSb2xlIjoxfSwiZW1wbG95ZWVSb2xlIjp7ImVtcGxveWVlSWQiOiI2IiwiZW1wbG95ZWVSb2xlIjoxfSwiZXhwIjoxNzE2Mjg4OTg0fQ.gW8icGbgxPEHWkWS6xMblvTBvB3SGlY2aDMC506OyOE');
  const formData = new FormData();
  formData.append('file', photo);
  return axios.post<emotionData>('/emotion/detect', formData);
}

export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/user/login', data);
}
