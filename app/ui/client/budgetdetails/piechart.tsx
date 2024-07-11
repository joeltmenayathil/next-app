// components/PieChart.tsx
'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
    balance: number;
    spent: number;
  }
  
const PieChart: React.FC<PieChartProps> = ({balance,spent}) => {
  const data = {
    labels: ['Spent', 'Balance'],
    datasets: [
      {
        label: 'Value($)',
        data: [spent, balance],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: '352px', height: '352px' }}>
        <Pie data={data} options={options} />
    </div>
)
};

export default PieChart;
