// components/BarChart.tsx
'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

interface BarChartProps {
    balance: number;
    spent: number;
}

const BarChart: React.FC<BarChartProps> = ({ balance, spent }) => {
    const data = {
        labels: ['Spent','Balance'], // A single label for the x-axis
        datasets: [
            {
                data: [spent, balance], // Data for the "Spent" bar
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
      scales: {
          y: {
              beginAtZero: true,
          },
      },
      plugins: {
        legend: {
            display: false, // Hides the legend
        },
    },
  };

  return (
      <div style={{ width: '352px', height: '352px' }}>
          <Bar data={data} options={options} />
      </div>
  );
};

export default BarChart;