// Improved UI version of SignupWithZod with better dialog styling + icons

import {
  Avatar,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
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
  IconButton,
} from "@mui/material";
import {
  Edit as EditIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import {
  FormProvider,
  useFieldArray,
  useForm,
  type SubmitHandler,
} from "react-hook-form";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Experience from "../components/Experience";
import Education from "../components/Education";

const steps = ["Personal Information", "Experience", "Education"];

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
    experience: z
      .array(
        z.object({
          company_name: z.string().trim().min(1, "Enter company name"),
          start_year: z.number().min(1, "Enter start year"),
          end_year: z.number().optional(),
          role: z.string().trim().min(1, "Enter role"),
        })
      )
      .nonempty(),
    education: z
      .array(
        z.object({
          school_name: z.string().trim().min(1, "Enter school name"),
          start_year: z.number().min(1, "Enter start year"),
          end_year: z.number().optional(),
        })
      )
      .nonempty(),
  })
  .required();

export type TLoginSchema = z.infer<typeof SignUPZODSchema>;

const SignupWithZod = () => {
  const methods = useForm({
    resolver: zodResolver(SignUPZODSchema),
  });

  const [modal, setModal] = useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    watch,
    control,
  } = methods;

  const [activeStep, setActiveStep] = useState(0);

  const { fields, append, remove, prepend } = useFieldArray({
    name: "hoobies",
    control: control,
  });

  const handleNext = async () => {
    let isValid = false;
    const validations = [
      [
        "name",
        "email",
        "password",
        "gender",
        "country",
        "isChecked",
        "hoobies",
      ],
      ["experience"],
      ["education"],
    ];

    isValid = await trigger(validations[activeStep]);
    if (isValid) setActiveStep((prev) => prev + 1);
  };

  const onSubmit: SubmitHandler<TLoginSchema> = (data) => {
    setModal(true);
    console.log(data, "DATA");
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Sign Up with Zod
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <FormProvider {...methods}>
          <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={3}>
            {activeStep === 0 && (
              <Stack spacing={2}>
                <TextField
                  {...register("name")}
                  label="Name"
                  error={!!errors.name}
                  helperText={errors?.name?.message}
                  fullWidth
                />
                <TextField
                  {...register("email")}
                  label="Email"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  fullWidth
                />
                <TextField
                  {...register("password")}
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  fullWidth
                />

                <FormControl error={!!errors.gender}>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup row {...register("gender")}>
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                  <FormHelperText>{errors?.gender?.message}</FormHelperText>
                </FormControl>

                <FormControl fullWidth error={!!errors.country}>
                  <FormLabel>Country</FormLabel>
                  <Select {...register("country")} displayEmpty>
                    <MenuItem disabled value="">
                      <em>Select a country</em>
                    </MenuItem>
                    {CountryJson.map((country) => (
                      <MenuItem key={country.code} value={country.code}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Avatar
                            src={country.flag}
                            sx={{ width: 20, height: 20 }}
                          />
                          <span>{country.name}</span>
                        </Stack>
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors?.country?.message}</FormHelperText>
                </FormControl>

                <FormControl error={!!errors?.hoobies} fullWidth>
                  <FormLabel>Hobbies</FormLabel>
                  <Stack spacing={1}>
                    {fields.map((value, index) => (
                      <TextField
                        key={value.id}
                        {...register(`hoobies.${index}.value`)}
                        placeholder={`Hobby #${index + 1}`}
                        error={!!errors?.hoobies?.[index]?.value}
                        helperText={errors?.hoobies?.[index]?.value?.message}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => remove(index)}
                                color="error"
                              >
                                <CancelIcon />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    ))}
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="outlined"
                        onClick={() => prepend({ value: "" })}
                      >
                        Prepend
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => append({ value: "" })}
                      >
                        Add Hobby
                      </Button>
                    </Stack>
                  </Stack>
                </FormControl>

                <FormControlLabel
                  control={<Checkbox {...register("isChecked")} />}
                  label="I agree to the terms & conditions"
                />
              </Stack>
            )}

            {activeStep === 1 && <Experience />}
            {activeStep === 2 && <Education />}

            <Stack direction="row" justifyContent="flex-end" spacing={2} mt={3}>
              {activeStep === steps.length - 1 ? (
                <Button
                  disabled={!watch("isChecked")}
                  type="submit"
                  variant="contained"
                  color="success"
                  startIcon={<CheckCircleIcon />}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  disabled={!watch("isChecked")}
                  onClick={handleNext}
                  variant="contained"
                >
                  Next
                </Button>
              )}
            </Stack>
          </Stack>
        </FormProvider>
      </Paper>

      <Dialog
        open={modal}
        onClose={() => setModal(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5">Review Your Submission</Typography>
            <IconButton onClick={() => setModal(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">Personal Information</Typography>
              <IconButton
                onClick={() => {
                  setModal(false);
                  setActiveStep(0);
                }}
              >
                <EditIcon />
              </IconButton>
            </Stack>
            <Divider />
            <Typography>Name: {watch("name")}</Typography>
            <Typography>Email: {watch("email")}</Typography>
            <Typography>Gender: {watch("gender")}</Typography>
            <Typography>Country: {watch("country")}</Typography>
            <Typography>
              Terms Accepted: {watch("isChecked") ? "Yes" : "No"}
            </Typography>

            <Typography variant="h6">Hobbies</Typography>
            <Divider />
            <Stack pl={2}>
              {watch("hoobies")?.map((hobby, i) => (
                <Typography key={i}>• {hobby.value}</Typography>
              ))}
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">Experience</Typography>
              <IconButton
                onClick={() => {
                  setModal(false);
                  setActiveStep(1);
                }}
              >
                <EditIcon />
              </IconButton>
            </Stack>
            <Divider />
            <Stack pl={2} spacing={1}>
              {watch("experience")?.map((exp, i) => (
                <Stack key={i} spacing={0.5}>
                  <Typography fontWeight={600}>#{i + 1}</Typography>
                  <Typography>Company: {exp.company_name}</Typography>
                  <Typography>Role: {exp.role}</Typography>
                  <Typography>Start Year: {exp.start_year}</Typography>
                  <Typography>End Year: {exp.end_year ?? "Current"}</Typography>
                </Stack>
              ))}
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">Education</Typography>
              <IconButton
                onClick={() => {
                  setModal(false);
                  setActiveStep(2);
                }}
              >
                <EditIcon />
              </IconButton>
            </Stack>
            <Divider />
            <Stack pl={2} spacing={1}>
              {watch("education")?.map((edu, i) => (
                <Stack key={i} spacing={0.5}>
                  <Typography fontWeight={600}>#{i + 1}</Typography>
                  <Typography>School: {edu.school_name}</Typography>
                  <Typography>Start Year: {edu.start_year}</Typography>
                  <Typography>End Year: {edu.end_year ?? "Ongoing"}</Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setModal(false)}
            variant="outlined"
            color="error"
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
          <Button
            onClick={() => alert("Final Submit")}
            variant="contained"
            color="primary"
            startIcon={<CheckCircleIcon />}
          >
            Confirm Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SignupWithZod;
