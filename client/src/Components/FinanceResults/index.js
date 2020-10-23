import React, { useState, useEffect } from "react";
import FinanceChart from "../FinanceChart";

function FinanceResults({ data }) {
  const [chartData, setChartData] = useState({});
  useEffect(() => {
    if (data) {
      // let labels, d;
      // labels = data.map(({ exchange }) => exchange);
      // d = data.map(({ score }) => score);
      // setChartData({
      //   labels: labels,
      //   datasets: [
      //     {
      //       label: "Score",
      //       data: d,
      //       backgroundColor: [
      //         "rgba(255, 99, 132, 0.6)",
      //         "rgba(54, 162, 235, 0.6)",
      //         "rgba(255, 206, 86, 0.6)",
      //         "rgba(75, 192, 192, 0.6)",
      //         "rgba(153, 102, 255, 0.6)",
      //         "rgba(255, 159, 64, 0.6)",
      //         "rgba(255, 99, 132, 0.6)",
      //       ],
      //     },
      //   ],
      // });
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
