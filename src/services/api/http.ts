import { APIErrorMap } from '@/utils/error.map';
import { Storage } from '@/utils/storage.map';
import axios, { AxiosError } from 'axios';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (
      error.response?.status === 401 ||
      (typeof error.response?.data === "string" &&
        error.response.data.includes(APIErrorMap.INVALID_TOKEN))
    ) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(Storage.TOKEN);
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export interface ApiResponse<T> {
  message: string;
  data: T | null;
  error: string[] | string | null;
}

export default http;
