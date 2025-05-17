import { AxiosError } from 'axios';
import http, { ApiResponse } from './http';
import { handleApiError } from '@/utils/error.map';

export async function login(
  email: string,
  senha: string,
): Promise<{
    token: string | null,
    error: string[] | null
}> {
    try {
        const { data } = await http.post<ApiResponse<string>>('/auth/login', {
          email,
          senha,
        });

        const { data: token, error } = data
        return { error: handleApiError(error), token }
    } catch (error) {
        if (error instanceof AxiosError && error?.response?.data?.error) return {
            token: null,
            error:  error?.response?.data?.error,
        }

        return {
            token: null,
            error: handleApiError('Erro ao realizar login')
        }
    }
}
