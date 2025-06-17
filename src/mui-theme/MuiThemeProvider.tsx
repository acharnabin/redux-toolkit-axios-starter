import { createTheme, ThemeProvider,CssBaseline } from "@mui/material";
import React from "react";

const MuiThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = createTheme({
    
  });
  return <ThemeProvider theme={theme}>
    <CssBaseline/>
    {children}</ThemeProvider>;
};

export default MuiThemeProvider;
