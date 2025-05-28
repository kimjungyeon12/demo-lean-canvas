// src/api/http.js 수정
import axios from 'axios';

function create(baseURL, options) {
  const instance = axios.create(Object.assign({ baseURL }), options);
  return instance;
}

// 환경에 따른 API URL 설정
const API_BASE_URL = import.meta.env.PROD
  ? '/api/proxy'  // 프로덕션에서는 프록시 사용
  : import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const canvases = create(`${API_BASE_URL}/canvases/`);

console.log('API Base URL:', API_BASE_URL);