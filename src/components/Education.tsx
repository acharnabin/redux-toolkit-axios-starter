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

const Education = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<TLoginSchema>();

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "education",
  });

  return (
    <Box>
      <Stack spacing={3}>
        <FormControl error={Boolean(errors?.education)}>
          <FormLabel>Education</FormLabel>

          {fields.map((field, index) => (
            <Stack key={field.id} spacing={2} direction="column">
              <Stack direction="row" spacing={2} alignItems="flex-end">
                <TextField
                  label="school_name"
                  fullWidth
                  {...register(`education.${index}.school_name`)}
                  error={!!errors.education?.[index]?.school_name}
                  helperText={errors.education?.[index]?.school_name?.message}
                />

                <TextField
                  label="Start Year"
                  type="number"
                  {...register(`education.${index}.start_year`, {
                    valueAsNumber: true,
                  })}
                  error={!!errors.education?.[index]?.start_year}
                  helperText={errors.education?.[index]?.start_year?.message}
                />

                <TextField
                  label="End Year"
                  type="number"
                  {...register(`education.${index}.end_year`, {
                    valueAsNumber: true,
                  })}
                  error={!!errors.education?.[index]?.end_year}
                  helperText={errors.education?.[index]?.end_year?.message}
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
              school_name: "",
              start_year: new Date().getFullYear(),
              end_year: undefined,
            })
          }
          variant="outlined"
        >
          Add Education
        </Button>
      </Stack>
    </Box>
  );
};

export default Education;
