import {

  Stack,
  TextField,
} from "@mui/material";

import {useFormContext } from "react-hook-form";
import type { TbusinessSchema } from "../pages/BusinessSetUp";

const SecondStep
 = () => {
  const methods = useFormContext<TbusinessSchema>();
  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <Stack direction="column" spacing={1} my={2}>
      <TextField
        {...register("name")}
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
        placeholder="Enter name"
      />
      <TextField
        {...register("email")}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        placeholder="email"
      />
      <TextField
        {...register("phone")}
        error={Boolean(errors.phone)}
        helperText={errors.phone?.message}
        placeholder="phone"
        type='number'
      />

       <TextField
        {...register("address")}
        error={Boolean(errors.address)}
        helperText={errors.address?.message}
        placeholder="address"
      />

    
    </Stack>
  );
};

export default SecondStep
;
