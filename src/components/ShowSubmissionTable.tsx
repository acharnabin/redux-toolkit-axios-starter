import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
  Tooltip,
  Button,
} from "@mui/material";
import { Business, Email, Phone, Web, LocationOn } from "@mui/icons-material";
import { useStoreState, useStoreValue } from "zustand-x";
import zustandStore from "../zustand/zustand-store";
import counterStore from "../zustand/counter-store";

//1.
// Jodi akta value access korte chai -> useStoreValue -> ata return kore akta single value
// const count2 = useStoreValue(counterStore, "count2");

// 2. value display + value chnage korbo -> useStoreState
// Jodi value display korte hy & chnage korte hy
//  const [_submissions,setSubmission]=useStoreState(zustandStore,'submmission')
// ata return kore useState aer mtoo , first one is the value and second one is the setter function

const useReturnFullName = () => {
  const firstName = useStoreValue(zustandStore, "first_name");
  const lastName = useStoreValue(zustandStore, "last_name");

  return `${firstName} ${lastName}`;
};

export default function ShowSubmissionTable() {
  const count = useStoreValue(counterStore, "count");
  const submissions = useStoreValue(zustandStore, "submmission");
  const firstName = useStoreValue(zustandStore, "first_name");
  const lastName = useStoreValue(zustandStore, "last_name");
  // const fullName = useStoreValue(zustandStore, "fullName");
  const _fullname=useReturnFullName()
  // const [name,setName]=useStoreState(zustandStore,'name')

  // 
  const testFtch=async()=>{
    // const res=await AxiosInstance.
    // setSubmission(resizeBy.data)
  }



  return (
    <Box p={3}>
      <Button
        // onClick={()=>setName(`${name}+${Math.random()}`)}
        onClick={() => {
          zustandStore.actions.setName(`New_name+${Math.random()}`);
        }}
      >
        chnage
      </Button>

      <Button
        // onClick={()=>setName(`${name}+${Math.random()}`)}
        onClick={() => {
          zustandStore.actions.reset();
        }}
        color="error"
        variant="contained"
      >
        Reset
      </Button>

      

      <h1>{zustandStore.selectors.fullName()}</h1>

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Total Submissions: {count}
      </Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Business fontSize="small" /> Business Name
              </TableCell>
              <TableCell>
                <Email fontSize="small" /> Email
              </TableCell>
              <TableCell>
                <Web fontSize="small" /> Website
              </TableCell>
              <TableCell>
                <Phone fontSize="small" /> Phone
              </TableCell>
              <TableCell>
                <LocationOn fontSize="small" /> Address
              </TableCell>
              <TableCell>ZIP</TableCell>
              <TableCell>Service Type</TableCell>
              <TableCell>Objectives</TableCell>
              <TableCell>Structure</TableCell>
              <TableCell>Hobbies</TableCell>
              <TableCell>Education</TableCell>
              <TableCell>File</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {submissions?.map((sub, index) => (
              <TableRow key={`${sub.business_name}-${index}`}>
                <TableCell>{sub.business_name}</TableCell>
                <TableCell>{sub.email}</TableCell>
                <TableCell>
                  <a href={sub.website} target="_blank" rel="noreferrer">
                    {sub.website}
                  </a>
                </TableCell>
                <TableCell>{sub.phone}</TableCell>
                <TableCell>{sub.address}</TableCell>
                <TableCell>{sub.zipCode}</TableCell>
                <TableCell>{sub.serviceType}</TableCell>

                {/* Objective Array */}
                <TableCell>
                  {sub.objective?.map((obj, idx) => (
                    <Chip
                      key={idx}
                      label={obj}
                      color="primary"
                      size="small"
                      style={{ marginRight: 4, marginBottom: 4 }}
                    />
                  ))}
                </TableCell>

                {/* Company Structure */}
                <TableCell>
                  {sub.compnayStucture?.map((struct, idx) => (
                    <Chip
                      key={idx}
                      label={struct}
                      size="small"
                      color="secondary"
                      style={{ marginRight: 4, marginBottom: 4 }}
                    />
                  ))}
                </TableCell>

                {/* Hobbies */}
                <TableCell>
                  {sub.hobbies?.map((hobby, idx) => (
                    <Tooltip
                      key={idx}
                      title={hobby.description}
                      arrow
                      placement="top"
                    >
                      <Chip
                        label={hobby.title}
                        size="small"
                        color="info"
                        style={{ marginRight: 4, marginBottom: 4 }}
                      />
                    </Tooltip>
                  ))}
                </TableCell>

                {/* Education */}
                <TableCell>
                  {sub.education?.map((edu, idx) => (
                    <Box key={idx}>
                      <Typography variant="body2" fontWeight="bold">
                        {edu.name}
                      </Typography>
                      <Typography variant="caption">
                        {edu.startYear} → {edu.endYear}
                      </Typography>
                    </Box>
                  ))}
                </TableCell>

                {/* File path */}
                <TableCell>
                  <a
                    href={sub.file?.relativePath}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {sub.file?.path?.split("/").pop()}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
