import { AppBar, Button, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  function toggleDrawer(open: boolean) {
    return function () {
      setDrawerOpen(open);
    };
  }

  const menuItems = ["Home", "Sobre", "Serviços", "Contato", "Login", "Posts"];
  const menuItensLinks = ["/", "/about", "/services", "/contact", "/login", "/posts"];
  
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* Título */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Minha Aplicação - Mentoria Frontend
          </Typography>

          {/* Botão de menu para dispositivos móveis */}
          {<IconButton
            color="inherit"
            edge="start"
            sx={{ display: { xs: "block", sm: "none" } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>}

          {/* Botões para telas maiores */}
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            {menuItems.map((item) => (
              <Button key={item} color="inherit" href={menuItensLinks[menuItems.indexOf(item)]}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer para dispositivos móveis */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          {menuItems.map((item) => (
            <ListItem component="button" key={item}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;