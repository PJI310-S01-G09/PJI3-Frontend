"use client";

import { useAuth } from "@/contexts/AuthContext";
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

const sideBarItems = [
  { text: "Agendar", href: "/", mustBeLoggedIn: false },
  { text: "Agendamentos", href: "/agendamentos", mustBeLoggedIn: true },
  // { text: "Inventário", href: "/inventario", mustBeLoggedIn: true },
];

export default function Sidebar() {
  const { isAuthenticated } = useAuth();
  const mappedSidebar = sideBarItems.filter((sidebar) =>
    sidebar.mustBeLoggedIn ? isAuthenticated : true
  );
  return (
    <Drawer variant="permanent" anchor="left" className="z-10">
      <div className="w-64 h-full bg-white shadow-md pt-16">
        <List>
          {mappedSidebar.map((item, index) => (
            <ListItem disablePadding key={`sidebarItem${index}`}>
              <ListItemButton href={item.href}>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
}
