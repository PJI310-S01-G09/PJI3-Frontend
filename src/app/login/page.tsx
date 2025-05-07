import { Button, TextField, Typography, Paper } from "@mui/material";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <Paper elevation={3} className="p-8 w-full max-w-sm">
        <DotLottieReact
          src="https://lottie.host/0da6f7fa-fab2-4892-93be-3866620c27ef/oFAIuwknI2.lottie"
          loop
          autoplay
        />
        <Typography variant="h5" className="mb-6 text-center">
          Login
        </Typography>
        <form className="flex flex-col gap-4">
          <TextField
            id="email"
            label="E-mail"
            type="email"
            variant="outlined"
            required
            fullWidth
          />
          <TextField
            id="password"
            label="Senha"
            type="password"
            variant="outlined"
            required
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Entrar
          </Button>
        </form>
      </Paper>
    </main>
  );
}
