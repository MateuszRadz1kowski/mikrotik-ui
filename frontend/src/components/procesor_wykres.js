import { useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function Procesor_wykres({ prop_cpu_data, setCpuData }) {
  const checkIfAbove30 = () => {
    if (prop_cpu_data.length >= 30) {
      setCpuData([]);
    }
    console.log(prop_cpu_data);
  };

  return (
    <div>
      <p>procesor wykres</p>
      <LineChart
        onChange={checkIfAbove30()}
        series={[
          {
            data: prop_cpu_data,
          },
        ]}
        height={300}
      />
    </div>
  );
}
