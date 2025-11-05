import { useState } from "react";
import Chip from "@mui/material/Chip";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Check_Internet from "./check_internet";

export default function M_status() {
  const [connected, setConnected] = useState(false);
  const [cpu, setCpu] = useState("");
  const [ram, setRam] = useState("");
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const getData = async ()=>{

  //     try{
  //     const response = await fetch("http://172.16.15.106:3000/status")
  //     const json = await response.json()
  //     console.log(json)
  //     setCpu(json['cpu-load'])
  //     setRam(json['free-memory'])
  //     setConnected(true)
  //     }
  //     catch(error){
  //         setCpu("")
  //         setRam("")
  //         setConnected(false)
  //     }
  //     console.log("called")
  // }

  // useEffect(()=>{
  //     setInterval(()=>{
  //         getData()
  //     },1000)
  // },[ram])

  return (
    <div>
      {connected ? (
        <Chip label="connected" color="green" />
      ) : (
        <Chip label="error" color="red" />
      )}

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="status tabs">
              <Tab label="CPU" value="1" />
              <Tab label="RAM" value="2" />
              <Tab label="Check Internet" value="3" />
            </TabList>
          </Box>

          <TabPanel value="1">{cpu}</TabPanel>
          <TabPanel value="2">{ram}</TabPanel>
          <TabPanel value="3">
            <Check_Internet />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
