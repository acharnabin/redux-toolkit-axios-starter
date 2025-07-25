import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import FirstStep from "../components/FirstStep";
import SecondStep from "../components/SecondStep";
// import FinalStep from "../components/FInalStep";

// Icons
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import ChecklistIcon from "@mui/icons-material/Checklist";
import ThirdStep from "../components/ThirdStep";
import FourthStep from "../components/FourthStep";
import FinalStep from "../components/FInalStep";
import FifthStep from "../components/FifthStep";
import ShowSubmissionTable from "../components/ShowSubmissionTable";
import { useStoreState, useStoreValue } from "zustand-x";
import zustandStore from "../zustand/zustand-store";
import counterStore from "../zustand/counter-store";
// import { Label } from "@mui/icons-material";

const businessSchema = z.object({
  business_name: z.string().trim().min(1, "Enter business name"),
  website: z.string().url("Enter a proper website"),
  zipCode: z.string().trim().min(1, "Enter zip code"),
  serviceType: z.string().trim().min(1, "Enter service type"),
  name: z.string().trim().min(1, "Enter your name"),
  email: z.string().trim().email("Enter proper email"),
  phone: z.string().trim().min(10).max(15),
  address: z.string().trim().min(1, "Enter address"),

  // step 3
  objective: z.array(z.string().trim()).nonempty("Select one objective"),
  compnayStucture: z.array(z.string().trim()).nonempty("Select one objective"),

  // step 4
  hobbies: z
    .array(
      z.object({
        title: z.string().trim().min(1),
        description: z.string().trim().optional(),
      })
    )
    .nonempty("Enter one hobby"),
  education: z
    .array(
      z.object({
        name: z.string().trim().min(1),
        startYear: z.string().trim().min(1),
        endYear: z.string().trim().min(1),
      })
    )
    .nonempty("Enter one education"),

  // file validation aer jonne
  file: z.custom<File | undefined>(
    (files: FileList) => {
      if (!files) {
        return false;
      }

      return true;
    },
    {
      message: " File is required",
    }
  ),
});

export type TbusinessSchema = z.infer<typeof businessSchema>;

const steps = [
  { label: "Business Set Up", icon: <BusinessIcon /> },
  { label: "Personal Info", icon: <PersonIcon /> },
  { label: "Third step", icon: <PersonIcon /> },
  { label: "Review", icon: <ChecklistIcon /> },
  { label: "File upload" },
];

const BusinessSetUp = () => {
  const [activeStep, setActiveStep] = useState(0);
  const methods = useForm<TbusinessSchema>({
    resolver: zodResolver(businessSchema),
    mode: "onTouched",
  });
  const [_submissions,setSubmission]=useStoreState(zustandStore,'submmission')
  const [_counter,setCounter]=useStoreState(counterStore,'count')
  const name=useStoreValue(zustandStore,'name')

  const { handleSubmit, trigger } = methods;

  const handleNextStep = async () => {
    let validate = false;

    if (activeStep === 0) {
      validate = await trigger([
        "business_name",
        "website",
        "zipCode",
        "serviceType",
      ]);
    } else if (activeStep === 1) {
      validate = await trigger(["name", "address", "email", "phone"]);
    } else if (activeStep === 2) {
      validate = await trigger(["compnayStucture", "objective"]);
    } else if (activeStep === 3) {
      validate = await trigger(["education", "hobbies"]);
    } else if (activeStep === 4) {
      validate = await trigger(["file"]);
    }

    if (validate) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const onSubmit = (data: TbusinessSchema) => {

    setSubmission([..._submissions,data])
    
    
    // api call
    setActiveStep((prev) => prev + 1);
    setCounter(_counter+1)
  };

  // useEffect(() => {
  //   window.addEventListener("beforeunload", () => {
  //     confirm("hi");
  //   });

  //   return () => {
  //     window.addEventListener("beforeunload", () => {
  //       confirm("hi");
  //     });
  //   };
  // }, []);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <FormProvider {...methods}>
        <Card component="form" onSubmit={handleSubmit(onSubmit)} elevation={4}>
          <CardContent>
            <Box mb={4}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(({ label }) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>

            <Box mb={4}>
              {activeStep === 0 && <FirstStep />}
              {activeStep === 1 && <SecondStep />}
              {activeStep === 2 && <ThirdStep />}
              {activeStep === 3 && <FourthStep />}

              {activeStep === 4 && <FifthStep />}
              {activeStep === 5 && <FinalStep 
                handleEditStep={step=>setActiveStep(step)}
              
              />}
              {activeStep === steps.length && (
                <Typography variant="h6" align="center" color="success.main">
                  🎉 Submission Successful!

                  <Button onClick={()=>{
                    setActiveStep(0);
                    methods.reset(undefined)
                  }}>
                    Arek ta entry add korbo
                  </Button>
                </Typography>
              )}
            </Box>

            {activeStep < steps.length && (
              <Stack direction="row" justifyContent="space-between">
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  Prev
                </Button>

                {activeStep < steps.length - 1 ? (
                  <Button variant="contained" onClick={handleNextStep}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                )}
              </Stack>
            )}
          </CardContent>
        </Card>
      </FormProvider>

      <Box mt={2}>
        <h1>
{name}
        </h1>
        
        <ShowSubmissionTable/>

      </Box>
    </Container>
  );
};

export default BusinessSetUp;
