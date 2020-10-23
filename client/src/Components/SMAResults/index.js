import React, { useState, useEffect } from "react";
import FinanceChart from "../FinanceChart";

function SMAResults({ data }) {
  const [chartData, setChartData] = useState();
  useEffect(() => {
    if (data) {
      let d = [];
      let l = [];
      for (const key in data) {
        l.push(key);
        d.push(data[key].SMA);
      }
      setChartData({
        labels: l,
        datasets: [
          {
            label: "SMA",
            data: d,
            backgroundColor: ["rgba(255, 99, 132, 0.6)"],
          },
        ],
      });
    }
  }, [data]);

  return <>{data && <FinanceChart data={chartData} name={"SMA"} />}</>;
}

export default SMAResults;
