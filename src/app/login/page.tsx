"use client";

import { Button, TextField, Typography, Paper, Box } from "@mui/material";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Login() {

  const paperStyles = {
    boxShadow: 'rgba(50, 50, 93, 0.5) 0px 50px 100px -20px, rgba(0, 0, 0, 0.8) 0px 30px 60px -30px, rgba(10, 37, 64, 0.3) 0px -2px 6px 0px inset',
    backgroundColor: 'white',
    margin: 'auto', 
    padding: '2rem', 
    width: '400px',
    maxHeight: '300px',
    maxWidth: '100%',
    borderRadius: '12px',
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
        </div>
      </Box>
    </main>
  );
}
