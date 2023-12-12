"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

type Props = {};

const ChartDashboardComponent = (props: Props) => {
  ChartJS.register(ArcElement, Legend);
  const data = {
    backgroundColor: [
      "rgb(2,88,255)",
      "rgb(255, 99, 132)",
      "rgb(255, 205, 86)",
      "rgb(75, 192, 192)",
    ],
    labels: ["Flashcards", "Quizzes", "Files", "Courses"],
    datasets: [
      {
        label: "Wykres",
        data: [25, 10, 50, 40],
        backgroundColor: [
          "rgb(2,88,255)",
          "rgb(255, 99, 132)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    elements: {
      arc: {
        weight: 0.5,
        borderWidth: 3,
      },
    },
    cutout: 130,
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          usePointStyle: true,
          color: "#006192", // Zmiana z 'fontColor' na 'color'
        },
      },
    },
  };

  return <Doughnut data={data} width={50} height={50} options={options} />;
};

export default ChartDashboardComponent;
