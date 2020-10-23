import React, { useState, useEffect } from "react";
import GetData from "./Utils/GetStockData";
import Search from "./Components/Search";
import Spinner from "./Components/Spinner";
import FinanceResults from "./Components/FinanceResults";
import NewsResults from "./Components/NewsResults";
import SidebarToggle from "./Components/SidebarToggle";
import Sidebar from "./Components/Sidebar";
import SidebarModal from "./Components/SidebarModal";
import ModalContextProvider from "./Context/ModalContextProvider";
import TopGainers from "./Components/TopGainers";
import BreakingNews from "./Components/BreakingNews";
import SMAResults from "./Components/SMAResults";
import GetStockSMAData from "./Utils/GetStockSMAData";
import Archives from "./Components/Archives";

function Finances() {
  const [value, setValue] = useState({});
  const [data, setData] = useState({});
  const [chart, setChart] = useState({});
  const [loading, setLoading] = useState(null);
  const search = async (e) => {
    e.preventDefault();
    setLoading(true);
    //
    let data = GetData(value);
    let chart;
    let finalData = await Promise.resolve(data).then((d) => {
      setData(d);
      return (chart = GetStockSMAData(d.quotes[0].symbol));
    });
    let finalChart = await Promise.resolve(chart).then((c) => {
      setChart(c);
      setLoading(false);
    });
  };
  return (
    <div className="container">
      <SidebarToggle />
      <Search search={search} setValue={setValue} />
      <TopGainers />
      <BreakingNews />
      <Archives />
      <ModalContextProvider>
        <SidebarModal />
        <Sidebar />
      </ModalContextProvider>

      {loading && loading === true ? (
        <Spinner center={true} />
      ) : (
        <>
          <NewsResults data={data.news} />
          <SMAResults data={chart["Technical Analysis: SMA"]} />
          <FinanceResults data={data.quotes} />
        </>
      )}
    </div>
  );
}

export default Finances;
