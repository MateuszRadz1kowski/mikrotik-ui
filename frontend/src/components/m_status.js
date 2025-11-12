import { useState } from "react";
import Chip from "@mui/material/Chip";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Check_Internet from "./check_internet";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Procesor_wykres from "./procesor_wykres";
import ComputerIcon from "@mui/icons-material/Computer";
import StorageIcon from "@mui/icons-material/Storage";
import Ram_wykres from "./ram_wykres";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function M_status() {
  const [connected, setConnected] = useState(false);
  const [cpu, setCpu] = useState("");
  const [ram, setRam] = useState("");
  const [cpuData, setCpuData] = useState([]);

  const [ramData, setRamData] = useState([]);
  const [value, setValue] = useState("1");
  const [openRam, setOpenRam] = useState(false);
  const handleOpenRam = () => setOpenRam(true);
  const handleCloseRam = () => setOpenRam(false);

  const [openCpu, setOpenCpu] = useState(false);
  const handleOpenCpu = () => setOpenCpu(true);
  const handleCloseCpu = () => setOpenCpu(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getData = async () => {
    try {
      const response = await fetch("http://172.16.15.106:3000/status");
      const json = await response.json();
      console.log(json);

      const cpuValue = json["cpu-load"];
      const ramValue = json["free-memory"];
      setCpu(cpuValue);
      setRam(ramValue);

      setCpuData((prev) => [...prev, cpuValue]);
      setRamData((prev) => [...prev, ramValue]);
      setConnected(true);
    } catch (error) {
      setCpu("");
      setRam("");
      setConnected(false);
    }
    console.log("called");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
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

      <Chip icon={<StorageIcon />} label={ram} onClick={handleOpenRam}></Chip>
      <Modal
        open={openRam}
        onClose={handleCloseRam}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Ram_wykres
              prop_ram_data={ramData}
              setRamData={setRamData}
            ></Ram_wykres>
          </Typography>
        </Box>
      </Modal>

      <Chip icon={<ComputerIcon />} label={cpu} onClick={handleOpenCpu}></Chip>
      <Modal
        open={openCpu}
        onClose={handleCloseCpu}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Procesor_wykres
              prop_cpu_data={cpuData}
              setCpuData={setCpuData}
            ></Procesor_wykres>
          </Typography>
        </Box>
      </Modal>

      {connected ? (
        <Chip label="connected" color="green" />
      ) : (
        <Chip label="error" color="red" />
      )}
    </div>
  );
}
