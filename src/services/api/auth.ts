import { AxiosError } from 'axios';
import http, { ApiResponse } from './http';

export async function login(
  email: string,
  senha: string,
): Promise<{
    token: string | null,
    error: string | string[] | null
}> {
    try {
        const { data } = await http.post<ApiResponse<string>>('/auth/login', {
          email,
          senha,
        });

        const { data: token, error } = data
        return { error, token }
    } catch (error) {
        if (error instanceof AxiosError && error?.response?.data?.error) return {
            token: null,
            error:  error?.response?.data?.error,
        }

        return {
            token: null,
            error: 'Erro ao realizar login'
        }
    }
}
