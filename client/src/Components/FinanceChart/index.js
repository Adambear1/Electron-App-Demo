import React from "react";
import { Line } from "react-chartjs-2";

function FinanceChart({ data, name }) {
  return (
    <div>
      <div className="chart">
        <Line
          data={data}
          options={{
            title: {
              display: true,
              text: name,
              fontSize: 25,
            },
            legend: {
              display: true,
              position: "right",
            },

            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
}

export default FinanceChart;
