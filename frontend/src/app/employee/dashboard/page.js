"use client";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useState } from "react";
import salesGrowthData from "../../../../public/data.json";

export default function BarCharts() {
  const [menuOpen, setMenuOpen] = useState(false); // Track menu open/close state

  // Example categories
  const categories = ["Category 1", "Category 2", "Category 3", "Category 4"];

  // Extract labels (Variety Codes), Plan QTY, Actual QTY, Plan Revenue, and Actual Revenue
  const labels = salesGrowthData.map((item) => item["Variety Code"]);
  const planQTY = salesGrowthData.map((item) => item.Plan["FY 22-23 QTY"]);
  const actualQTY = salesGrowthData.map((item) => item.Actuals["FY 22-23 QTY"]);
  const planRevenue = salesGrowthData.map((item) => item.Plan["FY 22-23 Revenue"]);
  const actualRevenue = salesGrowthData.map((item) => item.Actuals["FY 22-23 Revenue"]);

  // Data for QTY Bar Chart
  const qtyBarData = {
    labels,
    datasets: [
      {
        label: "Plan QTY",
        data: planQTY,
        backgroundColor: "#D2B48C",
        borderColor: "#8B4513",
        borderWidth: 2,
        borderRadius: 5,
      },
      {
        label: "Actual QTY",
        data: actualQTY,
        backgroundColor: "#8B4513",
        borderColor: "#D2B48C",
        borderWidth: 2,
        borderRadius: 5,
      },
    ],
  };

  // Data for Revenue Bar Chart
  const revenueBarData = {
    labels,
    datasets: [
      {
        label: "Plan Revenue",
        data: planRevenue,
        backgroundColor: "#D2B48C",
        borderColor: "#8B4513",
        borderWidth: 2,
        borderRadius: 5,
      },
      {
        label: "Actual Revenue",
        data: actualRevenue,
        backgroundColor: "#8B4513",
        borderColor: "#D2B48C",
        borderWidth: 2,
        borderRadius: 5,
      },
    ],
  };

  // Chart options
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(255, 255, 255, 0.2)" },
        ticks: { color: "white" },
      },
      y: {
        grid: { color: "rgba(255, 255, 255, 0.2)" },
        ticks: { color: "white" },
      },
    },
  };

  return (
    <div
      className="relative min-h-screen pb-20"
      style={{
        background: "linear-gradient(to bottom right, #307fb8, #267862, #632039, #666525)",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="pl-6 md:pl-12 pt-20 text-black">
        <h1 className="text-center text-2xl font-bold mb-6 text-white">Data</h1>

        {/* Categories Button */}
        <div className="flex flex-col items-center mb-6">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="px-4 py-2 bg-gray-300 text-black rounded-lg shadow-md flex items-center space-x-2 hover:bg-gray-400 transition-all"
          >
            <span>Categories</span>
            <span className={`transform transition-transform ${menuOpen ? "rotate-90" : ""}`}>
              ➡️
            </span>
          </button>

          {/* Dropdown Categories */}
          {menuOpen && (
            <div className="mt-4 bg-white rounded-lg shadow-lg p-4 w-64">
              <ul className="space-y-2">
                {categories.map((category, index) => (
                  <li
                    key={index}
                    className="text-black font-medium hover:bg-gray-200 p-2 rounded-md cursor-pointer"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Bar Charts */}
        <div className="flex flex-col items-center space-y-16 mt-6">
          {/* QTY Bar Chart */}
          <div className="w-full max-w-4xl h-[700px] bg-black bg-opacity-70 p-6 rounded-lg shadow-lg flex justify-center items-center">
            <div className="h-[500px] w-full">
              <h2 className="text-center mb-4 text-lg font-semibold text-white">
                QTY (Plan vs Actual)
              </h2>
              <Bar data={qtyBarData} options={barOptions} />
            </div>
          </div>

          {/* Revenue Bar Chart */}
          <div className="w-full max-w-4xl h-[700px] bg-black bg-opacity-70 p-6 rounded-lg shadow-lg flex justify-center items-center">
            <div className="h-[500px] w-full">
              <h2 className="text-center mb-4 text-lg font-semibold text-white">
                Revenue (Plan vs Actual)
              </h2>
              <Bar data={revenueBarData} options={barOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}