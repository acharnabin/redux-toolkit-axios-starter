import {
  Avatar,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const CountryJson = [
  {
    name: "United States",
    code: "US",
    flag: "https://flagcdn.com/us.svg",
  },
  {
    name: "Canada",
    code: "CA",
    flag: "https://flagcdn.com/ca.svg",
  },
  {
    name: "United Kingdom",
    code: "GB",
    flag: "https://flagcdn.com/gb.svg",
  },
  {
    name: "India",
    code: "IN",
    flag: "https://flagcdn.com/in.svg",
  },
  {
    name: "Germany",
    code: "DE",
    flag: "https://flagcdn.com/de.svg",
  },
  {
    name: "France",
    code: "FR",
    flag: "https://flagcdn.com/fr.svg",
  },
  {
    name: "Australia",
    code: "AU",
    flag: "https://flagcdn.com/au.svg",
  },
  {
    name: "Japan",
    code: "JP",
    flag: "https://flagcdn.com/jp.svg",
  },
  {
    name: "China",
    code: "CN",
    flag: "https://flagcdn.com/cn.svg",
  },
  {
    name: "Brazil",
    code: "BR",
    flag: "https://flagcdn.com/br.svg",
  },
];

const SignUpSchema = yup
  .object({
    name: yup.string().trim().required("Enter name").label("Name"),
    email: yup.string().trim().email().required(),
    password: yup
      .string()
      .trim()
      .required()
      .matches(passwordRegex, "Enter one number , one uppercase...."),
    isChecked: yup.boolean().default(false),
    gender: yup.string().trim().oneOf(["male", "female", "others"]).required(),
    country: yup.string().trim().required(),
  })
  .required();

type TLoginSchema = yup.InferType<typeof SignUpSchema>;

// interface TLoginSchema {
//     name:string;
//     email:string;
//     password:string;
//     isChecked:boolean;
//     test:string
// }

const Signup = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(SignUpSchema),
  });

  console.log(errors, watch("name"), getValues("name"));

  const onSubmit: SubmitHandler<TLoginSchema> = (data) => {
    // data.

    console.log(data, "DATA");
  };

  return (
    <Container maxWidth="md">
      <Paper>
        <Typography>Sign up</Typography>

        <Stack
          p={2}
          direction="column"
          mt={2}
          mb={2}
          spacing={1}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            {...register("name")}
            placeholder="Enter name"
            error={Boolean(errors?.name)}
            helperText={errors?.name?.message}
          />

          <TextField
            {...register("email")}
            error={Boolean(errors?.email)}
            helperText={errors?.email?.message}
            placeholder="Enter email"
          />

          <TextField
            {...register("password")}
            type='password'
            error={Boolean(errors?.password)}
            helperText={errors?.password?.message}
            placeholder="Enter password"
          />

          <FormControl error={Boolean(errors?.gender)}>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              {...register("gender")}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
            <FormHelperText>{errors?.gender?.message}</FormHelperText>
          </FormControl>

          <FormControl error={Boolean(errors.country)}>
            <FormLabel>Country</FormLabel>
            <Select error={Boolean(errors.country)} {...register("country")}>
              {CountryJson?.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  <Avatar src={country.flag} />
                  {country.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors?.country?.message}</FormHelperText>
          </FormControl>

          <FormControlLabel
            control={<Checkbox {...register("isChecked")} />}
            label="Check terms & conditions"
          />

          <Button
            type="submit"
            disabled={!watch("isChecked")}
            color="primary"
            variant="contained"
          >
            create account
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Signup;
