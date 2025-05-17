"use client";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import InputMask from "react-input-mask";
import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import { getFreeHours, schedule } from "@/services/api/schedule";
import { ScheduleFreeHours } from "@/entities/schedule.entity";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { APIErrorMap } from "@/utils/error.map";

export default function Home() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [isWhatsapp, setIsWhatsApp] = useState(false);
  const [data, setData] = useState<Dayjs | null>(dayjs().hour(8).minute(0));
  const [hora, setHora] = useState<Dayjs | null>(null);
  const [cpf, setCpf] = useState("");
  const [freeHours, setFreeHours] = useState<ScheduleFreeHours[]>([]);
  const { showMessage } = useSnackbar()

  useEffect(() => {
    fetchFreeHours();
  }, []);

  const resetFields = () => {
    setNome("");
    setEmail("");
    setTelefone("");
    setIsWhatsApp(false);
    setData(dayjs().hour(8).minute(0));
    setHora(null);
    setCpf("");
  }

  const fetchFreeHours = async () => {
    const { data, error } = await getFreeHours();

    if (error || !data) {
      console.error(error);
      return;
    }

    setFreeHours(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!data || !hora) return showMessage("Data e hora obrigatórias");

    const scheduledAt = data
      .set("hour", hora.hour())
      .set("minute", hora.minute())
      .set("second", 0)
      .set("millisecond", 0)
      .toISOString();

    const payload = {
      client: {
        name: nome,
        email,
        phone: telefone.replace(/\D/g, ""),
        cpf: cpf.replace(/\D/g, ""),
        isWhatsapp,
      },
      scheduledAt,
      serviceDuration: 60,
    };

    const { error, message, data: response } = await schedule(payload)

    if (error || !response) {
      console.error(error);
      showMessage(error?.map(e => APIErrorMap[e] || e)?.join(',') || 'Erro ao agendar', 'error')
      return
    }

    showMessage(message || 'Agendamento realizado com sucesso', 'success')
    fetchFreeHours()
    resetFields()
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
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <TextField
            label="E-mail"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Box>
            <InputMask
              mask="999.999.999-99"
              value={cpf}
              required
              onChange={(e) => setCpf(e.target.value)}
            >
              {(inputProps) => (
                <TextField {...inputProps} label="CPF" fullWidth />
              )}
            </InputMask>
          </Box>

          <Box>
            <InputMask
              mask="(99) 99999-9999"
              value={telefone}
              required
              onChange={(e) => setTelefone(e.target.value)}
            >
              {(inputProps) => (
                <TextField {...inputProps} label="Telefone" fullWidth />
              )}
            </InputMask>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isWhatsapp}
                  onChange={(e) => setIsWhatsApp(e.target.checked)}
                  color="primary"
                />
              }
              label="Este número possui WhatsApp?"
            />
          </Box>

          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            gap={4}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={data}
                onChange={(novaData) => {
                  setData(novaData);
                  setHora(null);
                }}
                shouldDisableDate={(day) => {
                  const formatted = day.format("YYYY-MM-DD");
                  return !freeHours.some((d) => d.date === formatted);
                }}
              />

              <Box
                flex={1}
                minHeight={300}
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Typography variant="subtitle1" gutterBottom>
                  Horários disponíveis:
                </Typography>

                {data ? (
                  <Box display="flex" flexWrap="wrap" gap={1} maxWidth="100%">
                    {(
                      freeHours.find(
                        (fh) => fh.date === data.format("YYYY-MM-DD")
                      )?.slots || []
                    ).map((slot) => (
                      <Button
                        key={slot}
                        variant={
                          hora?.format("HH:mm") === slot
                            ? "contained"
                            : "outlined"
                        }
                        onClick={() =>
                          setHora(
                            dayjs(`${data?.format("YYYY-MM-DD")}T${slot}`)
                          )
                        }
                        sx={{ minWidth: 80 }}
                      >
                        {slot}
                      </Button>
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary" mt={2}>
                    Selecione uma data para ver os horários disponíveis
                  </Typography>
                )}
              </Box>
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
