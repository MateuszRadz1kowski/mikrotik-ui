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
import Firewall_Info_Table from "./firewall_info_table";

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
      // console.log(json);

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
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Box className="w-full flex-1">
        <TabContext value={value}>
          <Box className="border-b border-gray-300">
            <TabList onChange={handleChange} centered>
              <Tab label="Firewall Info" value="1" />
              <Tab label="Item Two" value="2" />
              <Tab label="Item Three" value="3" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <Firewall_Info_Table />
          </TabPanel>
          <TabPanel value="2">Item two</TabPanel>
          <TabPanel value="3">Item three</TabPanel>
        </TabContext>
      </Box>

      <div>
        {connected ? (
          <Chip
            label="Connected"
            className="!bg-green-500 !text-white !rounded-full !px-4 !py-1"
          />
        ) : (
          <Chip
            label="Error"
            className="!bg-red-500 !text-white !rounded-full !px-4 !py-1"
          />
        )}

        <Chip
          icon={<StorageIcon />}
          label={ram}
          onClick={handleOpenRam}
          className="!rounded-full !px-4 !py-1"
        />

        <Chip
          icon={<ComputerIcon />}
          label={cpu}
          onClick={handleOpenCpu}
          className="!rounded-full !px-4 !py-1"
        />
      </div>

      <Modal open={openRam} onClose={handleCloseRam}>
        <Box sx={style}>
          <Typography variant="h6">RAM Chart</Typography>
          <Ram_wykres prop_ram_data={ramData} setRamData={setRamData} />
        </Box>
      </Modal>

      <Modal open={openCpu} onClose={handleCloseCpu}>
        <Box sx={style}>
          <Typography variant="h6">CPU Chart</Typography>
          <Procesor_wykres prop_cpu_data={cpuData} setCpuData={setCpuData} />
        </Box>
      </Modal>
    </div>
  );
}
