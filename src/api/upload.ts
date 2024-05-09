import axios from 'axios';
import { LoginData, LoginRes } from '@/api/user';

const instance = axios.create({
  // Todo: CORS问题
  // header的authorization是临时的
  baseURL: 'http://47.120.44.17:8080',
  headers: {
    Authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZUlkIjp7ImVtcGxveWVlSWQiOiI2IiwiZW1wbG95ZWVSb2xlIjoxfSwiZW1wbG95ZWVSb2xlIjp7ImVtcGxveWVlSWQiOiI2IiwiZW1wbG95ZWVSb2xlIjoxfSwiZXhwIjoxNzE1MjI2OTc3fQ.dQbQ91KFSY5QGDAbWWiQ1CMpKxE1BE_nC2XhJ-nIGMc',
    Accept: '*/*',
  },
});

export function uploadPhoto(photo: File) {
  return instance.post<File>('/emotion/detect', photo);
}

export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/user/login', data);
}
