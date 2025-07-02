import {
  Avatar,
  Button,
  Checkbox,
  Chip,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputAdornment,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

// const SignUpSchema = yup
//   .object({
//     name: yup.string().trim().required("Enter name").label("Name"),
//     email: yup.string().trim().email().required(),
//     password: yup
//       .string()
//       .trim()
//       .required()
//       .matches(passwordRegex, "Enter one number , one uppercase...."),
//     isChecked: yup.boolean().default(false),
//     gender: yup.string().trim().oneOf(["male", "female", "others"]).required(),
//     country: yup.string().trim().required(),
//   })
//   .required();

const SignUPZODSchema = z
  .object({
    name: z.string().trim().min(1, "Enter Name"),
    email: z.string().trim().email(),
    password: z.string().trim().regex(passwordRegex),
    gender: z.enum(["male", "female", "others"]),
    country: z.string().trim().min(1),
    isChecked: z.boolean().default(false),
    hoobies: z
      .array(
        z.object({
          value: z.string().trim().min(1, "Please add propr value"),
        })
      )
      .nonempty(),
  })
  .required();

type TLoginSchema = z.infer<typeof SignUPZODSchema>;

const SignupWithZod = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    watch,
    control,
  } = useForm({
    resolver: zodResolver(SignUPZODSchema),
  });

  const { fields, append, remove, prepend, insert } = useFieldArray({
    name: "hoobies",
    control: control,
  });

  console.log(errors, watch("name"), getValues("name"));

  const onSubmit: SubmitHandler<TLoginSchema> = (data) => {
    // data.

    console.log(data, "DATA");
  };

  return (
    <Container maxWidth="md">
      <Paper>
        <Typography>Sign up with zod</Typography>

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
            type="password"
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

          <FormControl error={Boolean(errors?.hoobies)}>
            <FormLabel>Hobbies</FormLabel>

            <Stack direction="column" spacing={1}>
              <Button
                variant="outlined"
                onClick={() =>
                  prepend({
                    value: "prepend added ",
                  })
                }
              >
                Prepend Hoobies
              </Button>
              {fields.map((value, index) => (
                <TextField
                  {...register(`hoobies.${index}.value`)}
                  key={value.id}
                  placeholder="Enter hobbies"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <Stack spacing={1} direction="row">
                            <Button
                              onClick={() => remove(index)}
                              disableElevation
                              variant="contained"
                              color="error"
                            >
                              Remove
                            </Button>
                            <Button
                              disableElevation
                              onClick={() =>
                                insert(index, {
                                  value: "inserted form insert",
                                })
                              }
                              variant="contained"
                              color="primary"
                            >
                              Insert
                            </Button>
                          </Stack>
                        </InputAdornment>
                      ),
                    },
                  }}
                  error={
                    errors?.hoobies && Boolean(errors?.hoobies[index]?.value)
                  }
                  helperText={
                    errors?.hoobies && errors?.hoobies[index]?.value?.message
                  }
                />
              ))}
              <Button
                variant="outlined"
                onClick={() =>
                  append({
                    value: "appedn added",
                  })
                }
              >
                Add Hoobies
              </Button>
            </Stack>
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

export default SignupWithZod;
