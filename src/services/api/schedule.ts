import { AxiosError } from "axios";
import http, { ApiResponse } from "./http";
import { handleApiError } from "@/utils/error.map";
import { Schedule, ScheduleFreeHours, ScheduleRequestBody } from "@/entities/schedule.entity";

export async function getSchedules(
  token: string
): Promise<{
  data: Schedule[] | null;
  error: string[] | null;
}> {
  try {
    const { data } = await http.get<ApiResponse<Schedule[]>>("/schedule", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { data: data.data, error: null };
  } catch (error) {
    if (error instanceof AxiosError && error?.response?.data?.error) {
      return {
        data: null,
        error: handleApiError(error.response.data.error),
      };
    }

    return {
      data: null,
      error: handleApiError("Erro ao buscar agendamentos"),
    };
  }
}

export async function getFreeHours(): Promise<{
  data: ScheduleFreeHours[] | null;
  error: string[] | null;
}> {
  try {
    const { data } = await http.get<ApiResponse<ScheduleFreeHours[]>>("/schedule/free-hours");

    return { data: data.data, error: null };
  } catch (error) {
    if (error instanceof AxiosError && error?.response?.data?.error) {
      return {
        data: null,
        error: handleApiError(error.response.data.error),
      };
    }

    return {
      data: null,
      error: handleApiError("Erro ao buscar horários livres"),
    };
  }
}

export async function schedule(payload: ScheduleRequestBody): Promise<{
    message: string | null,
    error: string[] | null,
    data?: Schedule
}> {
    try {
        const { data } = await http.post<ApiResponse<Schedule>>('/schedule', payload);

        const { data: apiResponse, error, message } = data

        return { error: handleApiError(error), data: apiResponse!, message }
    } catch (error) {
        if (error instanceof AxiosError && error?.response?.data?.error) return {
            message: null,
            error:  error?.response?.data?.error,
        }

        return {
            message: null,
            error: handleApiError('Erro ao realizar agendamento')
        }
    }
}
