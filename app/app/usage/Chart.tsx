"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ userId }: { userId: number }) => {
  const [creditHistory, setCreditHistory] = useState([]);

  // dummy data
  const dummyData = [
    { id: 1, userId: 1, credits: 100, timestamp: "2024-09-01T09:00:00Z" },
    { id: 2, userId: 1, credits: 95, timestamp: "2024-09-02T10:30:00Z" },
    { id: 3, userId: 1, credits: 85, timestamp: "2024-09-03T12:15:00Z" },
    { id: 4, userId: 1, credits: 90, timestamp: "2024-09-04T14:45:00Z" },
    { id: 5, userId: 1, credits: 80, timestamp: "2024-09-05T16:20:00Z" },
    { id: 6, userId: 1, credits: 70, timestamp: "2024-09-06T18:00:00Z" },
    { id: 7, userId: 1, credits: 60, timestamp: "2024-09-07T19:40:00Z" },
    { id: 8, userId: 1, credits: 65, timestamp: "2024-09-08T21:15:00Z" },
    { id: 9, userId: 1, credits: 55, timestamp: "2024-09-09T08:30:00Z" },
    { id: 10, userId: 1, credits: 50, timestamp: "2024-09-10T10:00:00Z" },
    { id: 11, userId: 1, credits: 45, timestamp: "2024-09-11T11:45:00Z" },
    { id: 12, userId: 1, credits: 40, timestamp: "2024-09-12T13:20:00Z" },
    { id: 13, userId: 1, credits: 30, timestamp: "2024-09-13T14:55:00Z" },
    { id: 14, userId: 1, credits: 25, timestamp: "2024-09-14T16:30:00Z" }
  ];

  useEffect(() => {
    axios
      .get(`/api/credit-usage/${userId}`)
      .then((response) => setCreditHistory(response.data))
      .catch((error) => console.error("Error fetching credit history:", error));
  }, [userId]);

  // x-axis daata
  const chartData = {
    labels: dummyData.map((item) =>
      new Date(item.timestamp).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Credits Over Time",
        data: dummyData.map((item) => item.credits), // Y-axis (credits)
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "#0076E0",
        pointBackgroundColor: "#ffffff"
        // pointBorderColor: "#0076E0"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true }
      // title: { display: true, text: "User Credits Usage" }
    }
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Chart;
