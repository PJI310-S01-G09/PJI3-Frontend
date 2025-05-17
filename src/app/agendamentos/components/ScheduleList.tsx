"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { getSchedules } from "@/services/api/schedule";
import { Schedule } from "@/entities/schedule.entity";
import { Box, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import Link from "next/link";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export const ScheduleList = () => {
  const { token } = useAuth();
  const [scheduleData, setScheduleData] = useState<Schedule[]>([]);
  const [filteredScheduleData, setFilteredScheduleData] = useState<Schedule[]>(
    []
  );
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    fetchSchedule();
  }, [token]);

  useEffect(() => {
    if (selectedDate) {
      setFilteredScheduleData(
        scheduleData.filter((s) =>
          dayjs(s.scheduledAt).isSame(selectedDate, "day")
        )
      );
    }
  }, [selectedDate]);

  const fetchSchedule = async () => {
    if (!token) return;

    const response = await getSchedules(token);
    if (response.error || !response.data) {
      console.log(response);
      return;
    }

    setScheduleData(response.data);
  };

  const agendamentoDates = new Set(
    scheduleData.map((s) => s.scheduledAt.slice(0, 10))
  );

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "clientName",
      headerName: "Cliente",
      flex: 1,
      valueGetter: (params, row) => row.client.name,
    },
    {
      field: "cpf",
      headerName: "CPF",
      flex: 1,
      valueGetter: (params, row) => row.client.cpf,
    },
    {
      field: "phone",
      headerName: "Telefone",
      flex: 1,
      renderCell: (params) => {
        const phone = params.row.client.phone;
        const isWhatsapp = params.row.client.isWhatsapp;
        return (
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body2">{phone}</Typography>
            {isWhatsapp && (
              <Link
                href={`https://wa.me/55${phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton size="small" sx={{ p: 0.5 }}>
                  <WhatsAppIcon color="success" fontSize="small" />
                </IconButton>
              </Link>
            )}
          </Box>
        );
      },
    },
    {
      field: "email",
      headerName: "E-mail",
      flex: 1,
      valueGetter: (params, row) => row.client.email,
    },
    {
      field: "scheduledAt",
      headerName: "Agendado para",
      flex: 1,
      valueGetter: (params, row) =>
        new Date(row.scheduledAt).toLocaleString("pt-BR"),
    },
    {
      field: "serviceDuration",
      headerName: "Duração (min)",
      width: 130,
    },
  ];

  return (
    <Box p={4} width="100%">
      <Typography variant="h4" gutterBottom>
        Agendamentos
      </Typography>

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
            shouldDisableDate={(day) =>
              !agendamentoDates.has(day.format("YYYY-MM-DD"))
            }
          />
        </LocalizationProvider>

        <Box flex={1}>
          {filteredScheduleData.length > 0 && (
            <Box sx={{ height: 600, width: "100%" }}>
              <DataGrid
                rows={filteredScheduleData}
                columns={columns}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[10]}
                getRowId={(row) => row.id}
                disableRowSelectionOnClick
              />
            </Box>
          )}
          {!selectedDate &&
            "Selecione uma data para exibir os agendamentos do dia"}
        </Box>
      </Box>
    </Box>
  );
};
