import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar  } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const BarChart = ({ chartData }) => {
 
  return (
    <div className='chart'>
      <Bar 
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Cryptocurrency prices"
            },
            legend: {
              display: true,
              position: "bottom"
           }
          }
        }}
      />
    </div>
  );
};

export default BarChart;