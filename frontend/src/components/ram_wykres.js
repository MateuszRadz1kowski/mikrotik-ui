import { useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function Ram_wykres({ prop_ram_data, setRamData }) {
  const checkIfAbove30 = () => {
    if (prop_ram_data.length >= 30) {
      setRamData([]);
    }
    console.log(prop_ram_data);
  };

  return (
    <div>
      <p>ram wykres</p>
      <LineChart
        onChange={checkIfAbove30()}
        series={[
          {
            data: prop_ram_data,
          },
        ]}
        height={300}
      />
    </div>
  );
}
