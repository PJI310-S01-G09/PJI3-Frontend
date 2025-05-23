import { Client } from "./client.entity";

export type Schedule = {
  id: number;
  clientId: number;
  scheduledAt: string;
  serviceDuration: number;
  createdAt: string;
  updatedAt: string;
  client: Client;
};

export type ScheduleResponse = {
  message: string;
  data: Schedule[];
  error: string[] | null;
};

export type ScheduleFreeHours = {
  date: string
  slots: string[]
}

export type ScheduleRequestBody = {
  scheduledAt: string
  serviceDuration: number
  client: {
    isWhatsapp: boolean
    cpf: string
    email: string
    name: string
    phone: string
  }
}
