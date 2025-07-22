import React from "react";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, Typography, Stack, Box, Chip, Button } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";

import { type TbusinessSchema } from "../pages/BusinessSetUp";

const FinalStep = ({
  handleEditStep
}:{
  handleEditStep:(step:number)=>void
}) => {
  const { watch } = useFormContext<TbusinessSchema>();
  const {
    business_name,
    website,
    zipCode,
    serviceType,
    name,
    email,
    phone,
    address,
    compnayStucture,
    education,
    hobbies,
    objective
  } = watch();

  const file = watch("file");

  return (
    <Card sx={{ maxWidth: 600, mx: "auto", mt: 4, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Business Summary 
        </Typography>

        <Button onClick={()=>handleEditStep(0)}>
          Edit
        </Button>

        <Stack spacing={2}>
          <Item icon={<BusinessIcon />} label="Business Name" value={business_name} />
          <Item icon={<LanguageIcon />} label="Website" value={website} />
          <Item icon={<LocationOnIcon />} label="Address" value={address} />
          <Item icon={<LocationOnIcon />} label="ZIP Code" value={zipCode} />
          <Item icon={<HomeRepairServiceIcon />} label="Service Type" value={serviceType} />
          <Item icon={<PersonIcon />} label="Contact Person" value={name} />
          <Item icon={<EmailIcon />} label="Email" value={email} />
          <Item icon={<PhoneIcon />} label="Phone" value={phone} />

          <Stack>
             <Button onClick={()=>handleEditStep(1)}>
          Edit
        </Button>
            <Typography>Company stucture</Typography>
            {compnayStucture.map((item)=><Chip label={item} key={item}/>)}
          </Stack>

           {!!file && (
            <Box key={file?.name}>
              <img
                src={URL.createObjectURL(file)}
                height={"80px"}
                width={"80px"}
                alt={file.name}
              />
             
            </Box>
          )}

          
        </Stack>
      </CardContent>
    </Card>
    
  );
};

const Item = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <Box display="flex" alignItems="center">
    <Box mr={2}>{icon}</Box>
    <Box>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  </Box>
);

export default FinalStep;
