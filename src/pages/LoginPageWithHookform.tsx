import { Button, Container, Stack, TextField } from "@mui/material";
import * as yup from "yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const LoginSchmea = yup
  .object({
    //
    name: yup.string().trim().required("Enter name"),
    address: yup.string().trim().required("Enter address"),
    email: yup.string().email().required("Enter proper email"),
    password: yup.string().trim().min(6).max(10).matches(passwordRegex, {
      message: "Enter one char , one number , ",
    }),
  })
  .required();

const zodSchema = zod.object({
  name: zod
    .string({
      message: "Enter name",
    })
    .trim().min(1),
  address: zod.string().trim().min(1),
  email: zod.string().email(),
  password: zod.string().trim().min(6).max(10).regex(passwordRegex),
});

type TLoginSchema = zod.infer<typeof zodSchema>;

const LoginPageWithHookFrom = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(LoginSchmea),
    resolver: zodResolver(zodSchema),
    mode: "all",
  });

  console.log(errors, "errors");

  const onSubmit: SubmitHandler<TLoginSchema> = (data) => {
    console.log(data, "data");
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
        onSubmit={handleSubmit(onSubmit)}
        spacing={1}
        direction="column"
        p={1}
      >
        <TextField
          {...register("name")}
          type="text"
          label="Name"
          placeholder="enter user name"
          helperText={errors?.name?.message}
          error={Boolean(errors?.name)}
        />
        <TextField
          {...register("address")}
          type="text"
          label="Address"
          placeholder="enter  address"
          helperText={errors?.address?.message}
          error={Boolean(errors?.address)}
        />
        <TextField
          {...register("email")}
          type="text"
          label="email"
          placeholder="enter email address"
          helperText={errors?.email?.message}
          error={Boolean(errors?.email)}
        />
        <TextField
          {...register("password")}
          type="password"
          label="password"
          placeholder="enter password"
          helperText={errors?.password?.message}
          error={Boolean(errors?.password)}
        />
        <Button type="submit" color="primary" variant="contained">
          Login
        </Button>
      </Stack>
    </Container>
  );
};

export default LoginPageWithHookFrom;
