import {
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import {useFormContext } from "react-hook-form";
import type { TbusinessSchema } from "../pages/BusinessSetUp";

const FirstStep = () => {
  const methods = useFormContext<TbusinessSchema>();
  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <Stack direction="column" spacing={1} my={2}>
      <TextField
        {...register("business_name")}
        error={Boolean(errors.business_name)}
        helperText={errors.business_name?.message}
        placeholder="business name"
      />
      <TextField
        {...register("website")}
        error={Boolean(errors.website)}
        helperText={errors.website?.message}
        placeholder="website name"
      />
      <TextField
        {...register("zipCode")}
        error={Boolean(errors.zipCode)}
        helperText={errors.zipCode?.message}
        placeholder="zip code"
      />

      <FormControl error={Boolean(errors.serviceType)}>
        <FormLabel>Service type</FormLabel>
        <Select
          {...register("serviceType")}
          error={Boolean(errors.serviceType)}
        >
          <MenuItem value="home_renovations">Home renovations</MenuItem>
        </Select>
        <FormHelperText>{errors?.serviceType?.message}</FormHelperText>
      </FormControl>
    </Stack>
  );
};

export default FirstStep;
