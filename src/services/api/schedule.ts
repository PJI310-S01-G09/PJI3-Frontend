import { AxiosError } from "axios";
import http, { ApiResponse } from "./http";
import { handleApiError } from "@/utils/error.map";
import { Schedule, ScheduleFreeHours } from "@/entities/schedule.entity";

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
