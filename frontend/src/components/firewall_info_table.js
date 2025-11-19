import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import ToggleButton from "@mui/material/ToggleButton";

export default function Firewall_Info_Table() {
  const [firewallData, setFirewallData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://172.16.15.106:3000/firewall/info");
        const json = await response.json();
        console.log(json);
        setFirewallData(json);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const changeFirewallEnabledStatus = async (id, currentDisabled) => {
    var newDisabled = false;

    currentDisabled == "false"
      ? (newDisabled = "true")
      : (newDisabled = "false");

    try {
      const response = await fetch(
        `http://172.16.15.106:3000/firewall/changeDisabledStatus?id=${id}&disabled=${newDisabled}`
      );
      const json = await response.json();
      console.log("Changed status:", json);
      setFirewallData((prev) =>
        prev.map((item) =>
          item[".id"] == id ? { ...item, disabled: newDisabled } : item
        )
      );
      console.log(firewallData);
      console.log("ID:", id, "New disabled status:", newDisabled);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">OPEN/CLOSE</TableCell>
              <TableCell align="right">ACTION</TableCell>
              <TableCell align="right">CHAIN</TableCell>
              <TableCell align="right">COMMENT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {firewallData.map((firewall) => (
              <TableRow
                key={firewall.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {firewall[".id"]}
                </TableCell>
                <TableCell align="right">
                  <ToggleButton
                    value={firewall.disabled}
                    selected={firewall.disabled}
                    onClick={() =>
                      changeFirewallEnabledStatus(
                        firewall[".id"],
                        firewall.disabled.toString()
                      )
                    }
                  >
                    {firewall.disabled == "true" ? (
                      <CancelPresentationIcon />
                    ) : (
                      <CheckIcon />
                    )}
                  </ToggleButton>
                </TableCell>
                <TableCell align="right">
                  {firewall.action == "accept" ? (
                    <CheckIcon className="text-green-500" />
                  ) : (
                    <CancelPresentationIcon className="text-red-500" />
                  )}
                </TableCell>
                <TableCell align="right">{firewall.chain}</TableCell>
                <TableCell align="right">
                  {firewall.comment ? firewall.comment : "No comment"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
