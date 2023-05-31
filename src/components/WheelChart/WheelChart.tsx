import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface IWheelChart {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

interface IWheelChartProps {
  data: IWheelChart;
}

const WheelChart: React.FC<IWheelChartProps> = ({data}) => {
 return <Doughnut data={data} />;
}

export default WheelChart;
