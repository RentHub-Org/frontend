"use client";

import React, { useEffect, useState } from "react";
import prisma from "@/lib/prisma";
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
import { getCreditsUsage } from "../actions/getCreditsUsage";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ userAddr }: { userAddr: string }) => {
  const [credits, setCredits] = useState<any[]>([]);

  useEffect(() => {
    const fetchCreditUsage = async () => {
      if (userAddr) {
        const credits = await getCreditsUsage(userAddr);
        setCredits(credits);
      }
    };

    fetchCreditUsage();
  }, [userAddr]);

  const chartData = {
    labels: credits.map(({ timestamp }) =>
      new Date(timestamp).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Credits Over Time",
        data: credits.map(({ credits }) => String(credits)),
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "#0076E0",
        pointBackgroundColor: "#ffffff"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: true } }
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Chart;
