"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { getSchedules } from "@/services/api/schedule";
import { Schedule } from "@/entities/schedule.entity";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

export const ScheduleList = () => {
  const { token } = useAuth();
  const [scheduleData, setScheduleData] = useState<Schedule[]>([]);

  useEffect(() => {
    fetchSchedule();
  }, [token]);

  const fetchSchedule = async () => {
    if (!token) return;

    const response = await getSchedules(token);
    if (response.error || !response.data) {
      console.log(response);
      return;
    }

    setScheduleData(response.data);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "clientName",
      headerName: "Cliente",
      flex: 1,
      valueGetter: (params, row) => row.client.name,
    },
    {
      field: "phone",
      headerName: "Telefone",
      flex: 1,
      valueGetter: (params, row) => row.client.phone,
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
      {scheduleData.length > 0 && (
        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={scheduleData}
            columns={columns}
            initialState={{
            pagination: {
                paginationModel: {
                pageSize: 10,
                },
            },
            }}
            pageSizeOptions={[10]}
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
          />
        </Box>
      )}
    </Box>
  );
};
