import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Stack, SxProps, Paper, Link, Button,
} from "@mui/material"
import React, { useEffect, useState } from 'react'
import { StyledHomeLayout, StyledButton} from "./styledHome";
import { AddFarm } from "./AddFarm"
import { AddOrderHatchery } from "./AddOrderHatchery"
import { AddCycle } from "./AddCycle"


function Home() {

const[isAddFarmOpen, setAddFarmState] = React.useState(false);
const[isAddCycleOpen, setAddCycleState] = React.useState(false);
const[isAddOrderHatcheryOpen, setOrderHatcheryState] = React.useState(false);

const toggleAddFarm = () => setAddFarmState(!isAddFarmOpen);
const toggleAddCycle = () => setAddCycleState(!isAddCycleOpen);
const toggleAddOrderHatchery = () => setOrderHatcheryState(!isAddOrderHatcheryOpen);


  return (
<div>
  <>
  <StyledHomeLayout>
  {TableHome()}
  <StyledButton variant="contained" onClick={() => toggleAddFarm()}>
  Dodaj Fermę
  </StyledButton>
  <StyledButton variant="contained" onClick={() => toggleAddOrderHatchery()}>
  Dodaj Pisklaki
  </StyledButton>
  <StyledButton variant="contained" onClick={() => toggleAddCycle()}>
  Dodaj Wstawienie
  </StyledButton>
  <AddFarm
        title={'Dodaj Fermę'}
        isOpen={isAddFarmOpen}
        onClose={toggleAddFarm}
      >
       Nazwa obiektu
       ...
  </AddFarm>
  <AddOrderHatchery
        title={'Dodaj zamówienie z wylęgarni'}
        isOpen={isAddOrderHatcheryOpen}
        onClose={toggleAddOrderHatchery}
      >
       Nazwa obiektu
       ...
  </AddOrderHatchery>
  <AddCycle
        title={'Dodaj wstawienie'}
        isOpen={isAddCycleOpen}
        onClose={toggleAddCycle}
      >
       Nazwa obiektu
       ...
  </AddCycle>
  </StyledHomeLayout>
  </>
</div>
  );
};

interface ObjectsHome {
  objectID:number;
  objectName: string;
  aliveMale: number;
  aliveFemale: number;
  deadMale: number;
  deadFemale: number;
  breedingDay: number;
  daysToExport: number;
}

const tableContainerSx: SxProps = {
  width: "max-content",
  maxHeight: 500, 
  border: "1px solid rgba(128,128,128,0.4)",
  marginLeft: "auto",
  marginRight: "auto",
  mariginTop: 4, 
  borderRadius: 4
}

export default function TableHome() {

  const [homeScreen, setHomeScreen] = React.useState([])

useEffect(() => {
  fetch('http://localhost:5228/api/Farms/GetHome?farmerID=1')
  .then(response => response.json())
  .then(res => setHomeScreen(res))
  .then(res => console.log(res))
  .catch(err => console.log(err))
}, [])

const objects: Array<ObjectsHome> = homeScreen;

  return (
    <TableContainer
      component={Paper}
      sx={tableContainerSx}
    >
      <Table stickyHeader = {true}>
        <TableHead sx={{ "& .MuiTableCell-stickyHeader": {
          backgroundColor: "rgb(27, 77, 137)", 
          fontSize: '1.2rem'
          } }}>
          <TableRow
                sx={{
                  backgroundColor: "yellow",
                  borderBottom: "2px solid black",
                  "& th": {
                    color: "rgb(249, 228, 91)"
                  }
                }}>
            <TableCell>Nazwa Obiektu</TableCell>
            <TableCell>Stan Indor</TableCell>
            <TableCell>Stan Indyczka</TableCell>
            <TableCell>Zgonów Indor</TableCell>
            <TableCell>Zgonów Indyczka</TableCell>
            <TableCell>Dzień hodowli</TableCell>
            <TableCell>Dni do zdawania</TableCell>
          </TableRow>
        </TableHead>
        <TableBody
        sx={{
          "& tr:nth-of-type(2n+1)": {
            backgroundColor: "grey.100",
          },
        }}>
        {objects.map((object) =>  (   
        <TableRow>
            <TableCell align='center'>{object.objectName}</TableCell>
            <TableCell align='center'>{object.aliveMale}</TableCell>
            <TableCell align='center'>{object.aliveFemale}</TableCell>
            <TableCell align='center'>{object.deadMale}</TableCell>
            <TableCell align='center'>{object.deadFemale}</TableCell>
            <TableCell align='center'>{object.breedingDay}</TableCell>
            <TableCell align='center'>{object.daysToExport}</TableCell>
        </TableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { Home };