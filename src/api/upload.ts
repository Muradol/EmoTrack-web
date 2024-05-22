import axios from 'axios';
import { LoginData, LoginRes } from '@/api/user';

// 定义情绪数据接口
export interface emotionResponse {
  anger: number;
  contempt: number;
  disgust: number;
  fear: number;
  happy: number;
  neutral: number;
  sad: number;
  surprise: number;
}

// 定义接口返回数据结构
export interface emotionData {
  code: number;
  message: string;
  data: {
    emotion_response: emotionResponse; // 情绪数据
    employeeId: string; // 员工ID
    recordTime: string; // 记录时间
    reportId: string | null; // 报告ID，可以为 null
    suggestion: string; // 建议
    warningType: number; // 警告类型
  };
}

export function uploadPhoto(photo: File) {
  const formData = new FormData();
  formData.append('image', photo);
  return axios.post<emotionData>('/emotion/detect', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/user/login', data);
}
