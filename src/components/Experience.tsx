import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { TLoginSchema } from "../pages/SignupWithZod";

const Experience = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<TLoginSchema>();

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "experience",
  });

  return (
    <Box>
      <Stack spacing={3}>
        <FormControl error={Boolean(errors?.experience)}>
          <FormLabel>Experience</FormLabel>

          {fields.map((field, index) => (
            <Stack key={field.id} spacing={2} direction="column">
              <Stack direction="row" spacing={2} alignItems="flex-end">
                <TextField
                  label="Company Name"
                  fullWidth
                  {...register(`experience.${index}.company_name`)}
                  error={!!errors.experience?.[index]?.company_name}
                  helperText={errors.experience?.[index]?.company_name?.message}
                />

                <TextField
                  label="Start Year"
                  type="number"
                  {...register(`experience.${index}.start_year`, {
                    valueAsNumber: true,
                  })}
                  error={!!errors.experience?.[index]?.start_year}
                  helperText={errors.experience?.[index]?.start_year?.message}
                />

                <TextField
                  label="End Year"
                  type="number"
                  {...register(`experience.${index}.end_year`, {
                    valueAsNumber: true,
                  })}
                  error={!!errors.experience?.[index]?.end_year}
                  helperText={errors.experience?.[index]?.end_year?.message}
                />

                <TextField
                  label="Role"
                  fullWidth
                  {...register(`experience.${index}.role`)}
                  error={!!errors.experience?.[index]?.role}
                  helperText={errors.experience?.[index]?.role?.message}
                />

                <IconButton onClick={() => remove(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Stack>
          ))}
        </FormControl>

        <Button
          onClick={() =>
            append({
              company_name: "",
              start_year: new Date().getFullYear(),
              end_year: undefined,
              role: "",
            })
          }
          variant="outlined"
        >
          Add Experience
        </Button>
      </Stack>
    </Box>
  );
};

export default Experience;
