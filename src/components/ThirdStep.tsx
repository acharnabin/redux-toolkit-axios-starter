import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { type TbusinessSchema } from "../pages/BusinessSetUp";

const companyStucture = ["option 1", "option 2", "option 3"];

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const ThirdStep = () => {
  const { register, setValue, watch ,formState:{errors}} = useFormContext<TbusinessSchema>();

  console.log(errors, "errors");

  const handleSelectCompanyStucture = (
    e: React.ChangeEvent<HTMLInputElement>,item:string
  ) => {
    if (e.target.checked) {
      const temp = compnayStucture;
      console.log(temp);
      setValue("compnayStucture", [...(compnayStucture || []), item]);
    } else {
      const temp = compnayStucture.filter((i) => i !== item);

      console.log(temp, "temp");

      setValue("compnayStucture", [...temp]);
    }
  };

  const compnayStucture = useMemo(
    () => watch("compnayStucture"),
    [watch("compnayStucture")]
  );

  return (
    <Stack direction="column" spacing={1} my={2}>
      <Typography>Your objective</Typography>

      <FormControl error={Boolean(errors.objective)}>
        <FormLabel>What best describes your objective?</FormLabel>
        <Select
          {...register("objective")}
          value={watch("objective") || []}
          multiple
          renderValue={(value) => value.join(",")}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox
                defaultChecked={watch("objective")?.includes(name)}
                checked={watch("objective")?.includes(name)}
              />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
            {errors?.objective?.message}
        </FormHelperText>
      </FormControl>

      <FormControl error={
        Boolean(errors?.compnayStucture)
      } sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">What is your company stucture?</FormLabel>
        <FormGroup>
          {companyStucture?.map((item) => (
            <FormControlLabel
              key={item}
              control={
                <Checkbox
                  checked={Boolean(watch("compnayStucture")?.includes(item))}
                  onChange={(e) => {handleSelectCompanyStucture(e,item)}}
                  name={item}
                />
              }
              label={item}
            />
          ))}
        </FormGroup>
         <FormHelperText>
            {errors?.compnayStucture?.message}
        </FormHelperText>
      </FormControl>
    </Stack>
  );
};

export default ThirdStep;
