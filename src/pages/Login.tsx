import { Button, Container, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

interface IErrorState {
  email: null | string;
  password: null | string;
  address: null | string;
  name: null | string;
}

const Login = () => {
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
    address: "",
    name: "",
  });

  const [errorState, setErrorState] = useState<IErrorState>({
    email: null,
    password: null,
    address: null,
    name: null,
  });

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;

    setInputState((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));

    // { inpput state aer sab ager vlaue + address:new}
  };

  const handleError = (key: string, message: string) => {
    // name : "enter name" - name:
    setErrorState((prev) => ({
      ...prev,
      [key]: message,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let error = false;
    setErrorState({
      email: null,
      password: null,
      address: null,
      name: null,
    });

    if (inputState.name?.trim().length === 0) {
      handleError("name", "Enter name");

      error = true;
    }

    if (inputState.address?.trim().length === 0) {
      handleError("address", "enter address");

      error = true;
    }

    // first check the email
    // user email field emty rekhe kina check korbo
    if (inputState.email?.trim().length === 0) {
      handleError("email", "Email enter karo");
      error = true;
    }
    // email format check
    // use korbo regex
    if (!emailRegex.test(inputState.email)) {
      handleError("email", "Enter proper email format");
      error = true;
    }

    if (!passwordRegex.test(inputState.password)) {
      handleError(
        "password",
        "At least one uppercase letter,At least one lowercase letter,At least one digit,Minimum 8 characters"
      );
      error = true;
    }

    if (error) {
      return;
    }

    alert("form submitted");
  };
  return (
    <Container
      maxWidth="sm"
      sx={{
        border: "1px solid red",
      }}
    >
      <Stack
        component="form"
        onSubmit={handleSubmit}
        spacing={1}
        direction="column"
        p={1}
      >
        <TextField
          name="name"
          value={inputState.name}
          onChange={(e) => handleInput(e)}
          type="text"
          label="Name"
          placeholder="enter user name"
          error={Boolean(errorState.name)}
          helperText={errorState.name}
        />
        <TextField
          name="address"
          value={inputState.address}
          onChange={(e) => handleInput(e)}
          type="text"
          label="Address"
          placeholder="enter  address"
          error={Boolean(errorState.address)}
          helperText={errorState.address}
        />
        <TextField
          name="email"
          value={inputState.email}
          onChange={handleInput}
          type="text"
          label="email"
          placeholder="enter email address"
          helperText={errorState.email}
          error={Boolean(errorState.email)}
        />
        <TextField
          name="password"
          value={inputState.password}
          onChange={handleInput}
          type="password"
          label="password"
          error={Boolean(errorState.password)}
          helperText={errorState.password}
          placeholder="enter password"
        />
        <Button type="submit" color="primary" variant="contained">
          Login
        </Button>
      </Stack>
    </Container>
  );
};

export default Login;
