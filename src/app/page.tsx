"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DigitalClock } from "@mui/x-date-pickers/DigitalClock";
import dayjs, { Dayjs } from "dayjs";

export default function Home() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState<Dayjs | null>(null);
  const [hora, setHora] = useState<Dayjs | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      nome,
      email,
      data: data?.toDate() || null,
      hora: hora?.toDate() || null,
    });
    alert("Agendado com sucesso!");
  };

  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <Sidebar />
      <Box className="pl-64 pt-16">
        <form
          onSubmit={handleSubmit}
          className="m-10 p-6 bg-white shadow-lg rounded-2xl space-y-4"
        >
          <Typography
            variant="h3"
            className="text-black font-semibold text-center"
          >
            Agendamento
          </Typography>

          <TextField
            label="Nome"
            fullWidth
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <TextField
            label="E-mail"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Box className="flex">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={data}
              onChange={(novaData) => setData(novaData)}
            />
            <DigitalClock
              value={hora}
              onChange={(novaHora) => setHora(novaHora)}
            />
          </LocalizationProvider>
          </Box>

          
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Agendar
          </Button>
        </form>
      </Box>
      Agendar
    </main>
  );
}
