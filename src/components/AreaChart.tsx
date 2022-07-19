import React from "react";
import { Box, Slider } from "@mui/material";
import htmlLegendPlugin from "./CustomeLegendsPlugin";

import {GetDataForChart} from './Helples';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,  
} from "chart.js";
import { Line } from "react-chartjs-2";



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  htmlLegendPlugin
);


const step = 0.083;
const minYear = 2020;
const maxYear = 2023;
const months = Array.from({ length: 12 }, (item, i) => {
  return new Date(0, i).toLocaleString("en-US", { month: "short" });
});



type silderMarks = {
  value: number,
  label: string
}
export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      position: "top" as const,
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
      align : 'start' as const,
      display: false,
    },   
    htmlLegend: {     
      containerID: 'legend-container',
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

export const data12 = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Dataset 3",
      data: [1, 5, 5, 8, 15, 20, 1],
      borderColor: "rgba(242, 223, 58, 0.5)",
      backgroundColor:  "rgba(242, 223, 58, 0.5)",
      tension: 0.4,
    },
    
    {
      fill: true,
      label: "Dataset 2",
      data: [80, 5, 70, 10, 78, 100, 45],
      borderColor: "rgba(58, 180, 242,0.5)",
      backgroundColor:  "rgba(58, 180, 242,0.5)",
      tension: 0.4,
    },
    {
      fill: true,
      label: "Dataset 1",
      data: [12, 15, 70, 56, 78, 89, 67],
      borderColor: "rgba(0, 120, 170, 0.5)",
      backgroundColor: "rgba(0, 120, 170, 0.5)",
      tension: 0.4,
    },
   
  ],
};
const labels2 = ["2019", "2020", "2021", "2022", "2023", "2024", "2025"];
export const options2 = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      position: "top" as const,
      display: false,
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
      display: false,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};
export const data2 = {
  labels: labels2,
  datasets: [
    {
      fill: true,
      label: "Dataset 1",
      data: [12, 15, 70, 56, 78, 89, 67],
      borderColor: "rgba(223, 223, 222)",
      backgroundColor: "rgba(223, 223, 222, 0.5)",
      tension: 0.4,
    },
  ],
};
const AreaChart = () => {

  const [data, setData] = React.useState<any>(GetDataForChart(minYear, maxYear, "Monthly"));
  const [value, setValue] = React.useState<number[]>([minYear, maxYear]);
 

  const handleChange = (event: Event, newValue: number | number[]) => {
    let numbers = newValue as number[];
    setValue(numbers);
    const data = GetDataForChart(numbers[0], numbers[1], "Monthly");
    setData(data);
    // // console.log(data);
    // console.log(newValue);
  };

  const handleChange2 = (event: React.SyntheticEvent | Event, value: number | Array<number>) => {
     let numbers = value as number[];
    // setValue(numbers);
    // const data = GetDataForChart(numbers[0], numbers[1], "Monthly");
    // setData(data);
    // console.log(data);
    console.log(numbers);
  }

  
  const getLabel = (value: number) => {
    let strValue = value.toString().split('.');
    let textToShow = `${months[0]} ${strValue[0]}`;   
    if (!!strValue && strValue.length === 2) {
      let index = Math.ceil(Number('0.' + strValue[1]) / step);;
      textToShow = `${months[index]} ${strValue[0]}`
    }
    return textToShow;
  }

  const generateMarks = React.useCallback(() => {
    let marks: silderMarks[] = [];
    for (let i = minYear; i <= maxYear; i++) {
      for (let j = 0; j < 12; j++) {
        let value = (i + (j * step));
        marks.push({ label: `${j === 0 ? i.toString() : ""}`, value: value });
      }
    }
    console.log(marks)
    return marks;
  }, []);
  return (
    <>
      <Box
        sx={{
          height: "calc(100vh - 40%)",
          width: "calc(100vw - 40%)",
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
          paddingBottom: "3rem",
          flexDirection: 'column'
        }}
      >
        <div id="legend-container" style={{marginBottom:'2rem'}}></div>
        <Line id="chartJSContainer" options={options} data={data} />
      </Box>
      <Box
        sx={{
          height: "7rem",
          width: "calc(100vw - 40%)",
          display: "block",
          position: "relative",
        }}
      >
        <Line options={options2} data={data2} />
        <Box
          sx={{
            width: "calc(100% - 2.5rem)",
            top: "86px",
            position: "absolute",
          }}
        >
          <Slider
            getAriaLabel={() => "Date range"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={getLabel}
            min={minYear}
            max={maxYear}
            marks={generateMarks()}
            step={null}
            sx={{
              width: "100%",
              margin: "0 0 0 2.3rem",
            }}
            valueLabelFormat={getLabel}
            onChangeCommitted={handleChange2}
          />
        </Box>
      </Box>
    </>
  );
};

export default AreaChart;
