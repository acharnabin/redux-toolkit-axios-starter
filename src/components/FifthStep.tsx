import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { type TbusinessSchema } from "../pages/BusinessSetUp";

// Handle file validation

const maxSize = 100000; // 5mb

const FifthStep = () => {
  const {
   
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<TbusinessSchema>();

  const file = watch("file");

  const onDrop = (files) => {
    console.log(files[0]);

    setValue("file", files[0],{
shouldValidate:true
    });
  };

  const validator = (file: File) => {
    if (file.size > maxSize) {
      return {
        code: "file-too-large",
        message: `File is larger than 100kb`,
      };
    }

    return null;
  };

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
    },
    validator: validator,
    maxFiles: 1,
    multiple: false,
  });
  const theme = useTheme();

  return (
    <Stack>
      
      <FormControl error={Boolean(errors.file)}>
        <FormLabel>Upload a file</FormLabel>
        <Box
          {...getRootProps()}
          border={`10px solid ${isDragActive ? "red" : "grey"}`}
          borderRadius={2}
          padding={"10px 20px"}
          bgcolor={theme.palette.success["light"]}
        >
          <input {...getInputProps()} />
          <Typography>
            <p>Drop the files here ...</p>
            <p>Drag 'n' drop some files here, or click to select files</p>
          </Typography>
        </Box>
        <Stack mt={2}>
          {!!file && (
            <Box key={file?.name}>
              <img
                src={URL.createObjectURL(file)}
                height={"80px"}
                width={"80px"}
                alt={file.name}
              />
              <Button onClick={() => setValue("file", undefined)}>
                Delete
              </Button>
            </Box>
          )}
        </Stack>
        <FormHelperText>{errors?.file?.message}</FormHelperText>
      </FormControl>
    </Stack>
  );
};

export default FifthStep;
