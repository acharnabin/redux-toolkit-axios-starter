import {
  Button,
  Chip,
  FormControl,
  FormLabel,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { type TbusinessSchema } from "../pages/BusinessSetUp";
import { Delete } from "@mui/icons-material";

const FourthStep = () => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<TbusinessSchema>();

  const hobbies = useMemo(() => watch("hobbies"), [watch("hobbies")]);

  const { append, fields, remove, prepend, insert } =
    useFieldArray<TbusinessSchema>({
      name: "hobbies",
      control
    });

  const { append: educationAppend, fields: educationFields } =
    useFieldArray<TbusinessSchema>({
      name: "education",
      control
    });

  return (
    <Stack my={1} direction="column" spacing={1}>
      <FormControl error={Boolean(errors?.hobbies)}>
        <FormLabel>Hobbies</FormLabel>
        <Button
          onClick={() => {
            prepend({
              title: "",
              description: "",
            });
          }}
        >
          Prepend new hobbie
        </Button>
        {fields?.map((item, index) => (
          <Stack
            border={"1px solid green"}
            key={item?.id}
            my={1}
            direction="column"
            spacing={1}
          >
            <Typography>
              # {index + 1}
              <IconButton onClick={() => remove(index)}>
                <Delete />
              </IconButton>
            </Typography>

            <TextField
              {...register(`hobbies.${index}.title`)}
              label="Tilte"
              placeholder="Tilte"
              error={errors?.hobbies && Boolean(errors?.hobbies[index]?.title)}
              helperText={
                errors?.hobbies ? errors?.hobbies[index]?.title?.message : ""
              }
            />
            <TextField
              label="description"
              placeholder="description"
              {...register(`hobbies.${index}.description`)}
              error={
                errors?.hobbies &&
                Boolean(errors?.hobbies[index]?.description?.message)
              }
              helperText={
                errors?.hobbies
                  ? errors?.hobbies[index]?.description?.message
                  : ""
              }
            />
            <Button
              onClick={() => {
                insert(index, {
                  title: "ami middle ae add holam",
                  description: "",
                });
              }}
            >
              Middle ae add korbo
            </Button>
          </Stack>
        ))}

        <Button
          onClick={() => {
            append({
              title: "",
              description: "",
            });
          }}
        >
          Add new hobbie
        </Button>
      </FormControl>

      {hobbies?.map((item) => (
        <Chip key={item?.title} label={item?.title} />
      ))}

      <FormControl error={Boolean(errors?.education)}>
        <FormLabel>Education</FormLabel>

        {educationFields?.map((item, index) => (
          <Stack
            key={item?.id}
            my={1}
            direction="column"
            spacing={1}
            border={"1px solid blue"}
          >
            <Typography># {index + 1}</Typography>
            <TextField
              {...register(`education.${index}.name`)}
              error={
                errors?.education &&
                Boolean(errors?.education[index]?.name?.message)
              }
              helperText={
                errors?.education ? errors?.education[index]?.name?.message : ""
              }
              label="Institution name"
              placeholder="institutation name"
            />
            <TextField
              {...register(`education.${index}.startYear`)}
              label="start year"
              placeholder="start year"
              type='date'
              error={
                errors?.education &&
                Boolean(errors?.education[index]?.startYear?.message)
              }
              helperText={
                errors?.education
                  ? errors?.education[index]?.startYear?.message
                  : ""
              }
            />
            <TextField
              {...register(`education.${index}.endYear`)}
              label="end year"
              placeholder="end year"
              type='date'
              error={
                errors?.education &&
                Boolean(errors?.education[index]?.endYear?.message)
              }
              helperText={
                errors?.education
                  ? errors?.education[index]?.endYear?.message
                  : ""
              }
            />
          </Stack>
        ))}
        <Button
          onClick={() => {
            educationAppend({
              name: "",
              startYear: "",
              endYear: "",
            });
          }}
        >
          Add new education
        </Button>
      </FormControl>
    </Stack>
  );
};

export default FourthStep;
