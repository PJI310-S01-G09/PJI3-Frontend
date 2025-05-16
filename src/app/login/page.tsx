"use client";

import {
  Button,
  TextField,
  Typography,
  Paper,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/navigation";
import { login as loginService } from "@/services/api/auth";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth(); // 🔥 contexto de autenticação
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", senha: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const { token, error } = await loginService(form.email, form.senha);

    setLoading(false);

    if (token) {
      login(token);
      router.push("/agendamentos");
    } else {
      if (error)
        setErrorMsg(typeof error === "string" ? error : error?.join(", "));
    }
  };

  const paperStyles = {
    boxShadow:
      "rgba(50, 50, 93, 0.5) 0px 50px 100px -20px, rgba(0, 0, 0, 0.8) 0px 30px 60px -30px, rgba(10, 37, 64, 0.3) 0px -2px 6px 0px inset",
    backgroundColor: "white",
    margin: "auto",
    padding: "2rem",
    width: "400px",
    maxWidth: "100%",
    borderRadius: "12px",
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <DotLottieReact
        src="https://lottie.host/0da6f7fa-fab2-4892-93be-3866620c27ef/oFAIuwknI2.lottie"
        loop
        autoplay
      />
      <Box className="px-[300px] flex bg-blue-500 h-screen">
        <div style={paperStyles}>
          <Typography variant="h5" className="mb-6 text-center">
            Login
          </Typography>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <TextField
              id="email"
              name="email"
              label="E-mail"
              type="email"
              variant="outlined"
              required
              fullWidth
              value={form.email}
              onChange={handleChange}
            />
            <div className="relative">
              <TextField
                id="senha"
                name="senha"
                label="Senha"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                required
                fullWidth
                value={form.senha}
                onChange={handleChange}
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
                role="button"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <VisibilityOff sx={{ color: "rgba(0, 0, 0, 0.38)" }} />
                ) : (
                  <Visibility sx={{ color: "rgba(0, 0, 0, 0.38)" }} />
                )}
              </span>
            </div>

            {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Entrar"}
            </Button>
          </form>
        </div>
      </Box>
    </main>
  );
}
