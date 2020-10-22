import React, { useEffect, useState } from "react";
import { promiseStatus } from "promise-status-async";
import GetTopGainers from "../../Utils/GetTopGainers";
import "./styles.css";

function TopGainers() {
  const [stocks, setStocks] = useState();
  useEffect(() => {
    Promise.resolve(GetTopGainers()).then((item) => {
      setStocks(item);
    });
  }, []);
  return (
    <>
      <h1 class="align-center">Top Gainers</h1>
      <div class="scrollmenu">
        {stocks &&
          stocks.quotes.map(({ displayName, symbol }) => {
            return (
              <a
                href={`https://finance.yahoo.com/quote/${symbol}?p=${symbol}`}
                target="_blank"
              >
                {displayName}
                {"   "}
                <small>({symbol})</small>
              </a>
            );
          })}
      </div>
    </>
  );
}

export default TopGainers;
