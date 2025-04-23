import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="fixed" className="bg-white shadow-md z-50">
      <Toolbar className="flex justify-between">
        {/* Logo ou Nome */}
        <div className="flex items-center gap-2">
          <Typography variant="h6" className="text-black font-semibold">
            Agendamento
          </Typography>
        </div>
        {/* NavBar */}
        <div className="space-x-4">
          <Button color="inherit" className="text-black">
            Início
          </Button>
          <Button color="inherit" className="text-black">
            Sobre
          </Button>
          <Button color="inherit" className="text-black">
            Contato
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
