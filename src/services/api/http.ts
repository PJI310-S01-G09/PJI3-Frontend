import axios from 'axios';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

export interface ApiResponse<T> {
  message: string;
  data: T | null;
  error: string[] | string | null;
}

export default http;
