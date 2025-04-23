import { AppBar, Button, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";

export default function Sidebar() {
  return (
    <Drawer variant="permanent" anchor="left" className="z-10">
      <div className="w-64 h-full bg-white shadow-md pt-16">
        <List>
          <ListItem disablePadding>
            <ListItemButton href="/">
              <ListItemText primary="Agendar" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton href="/agendamentos">
              <ListItemText primary="Agendamentos" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton href="/inventario">
              <ListItemText primary="Inventário" />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}
