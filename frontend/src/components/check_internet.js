import Button from "@mui/material/Button";
import { useState } from "react";
import ChooseInternetWebsite from "./chooseInternetWebsite";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Check_Internet() {
  const [internet, setInternet] = useState(true);
  const [chosenWebsite, setChosenWebsite] = useState("");
  const [packets, setPackets] = useState(1);
  const [data, setData] = useState("");

  const pingSite = async () => {
    if (!chosenWebsite) {
      alert("Please choose a website first!");
      return;
    }

    try {
      console.log(chosenWebsite);
      console.log(packets);
      const response = await fetch(
        `http://172.16.15.106:3000/tool/internet?website=${chosenWebsite}&packets=${packets}`
      );
      const json = await response.json();
      console.log(json);
      setData(json);
      if (json[0].status == "timeout") {
        setInternet(false);
      } else {
        setInternet(true);
      }
    } catch (error) {
      console.error(error);
      setInternet(false);
    }
  };

  return (
    <div>
      <ChooseInternetWebsite
        chosenWebsite={chosenWebsite}
        setChosenWebsite={setChosenWebsite}
        packets={packets}
        setPackets={setPackets}
      />
      <Button
        variant="contained"
        color={internet ? "success" : "error"}
        onClick={pingSite}
      >
        Check Internet
      </Button>
      {data ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Packet Number: </TableCell>
                  <TableCell align="right">Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((data, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="right">{data.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <h1>No data to show</h1>
      )}
    </div>
  );
}
