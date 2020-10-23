import React, { useState, useEffect } from "react";
import FinanceChart from "../FinanceChart";

function FinanceResults({ data }) {
  const [chartData, setChartData] = useState({});
  useEffect(() => {
    if (data) {
      let labels, d;
      labels = data.map(({ exchange }) => exchange);
      d = data.map(({ score }) => score);
      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Score",
            data: d,
            backgroundColor: ["rgba(255, 99, 132, 0.6)"],
          },
        ],
      });
    }
  }, [data]);

  return (
    <>
      {data && (
        <FinanceChart
          data={chartData}
          name={"Average Scores for " + data[0].longname}
        />
      )}
    </>
  );
}

export default FinanceResults;
