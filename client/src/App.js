import React, { useState } from "react";
import GetData from "./Utils/GetStockData";
import Search from "./Components/Search";
import Spinner from "./Components/Spinner";
import FinanceResults from "./Components/FinanceResults";
import NewsResults from "./Components/NewsResults";
import SidebarToggle from "./Components/SidebarToggle";
import Sidebar from "./Components/Sidebar";
import SidebarModal from "./Components/SidebarModal";
import ModalContextProvider from "./Context/ModalContextProvider";

function App() {
  const [value, setValue] = useState({});
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(null);
  const search = (e) => {
    e.preventDefault();
    setLoading(true);
    let data = GetData(value);
    Promise.resolve(data).then((d) => {
      setLoading(false);
      setData(d);
    });
    setData(data);
  };

  return (
    <div className="container">
      <SidebarToggle />
      <Search search={search} setValue={setValue} />
      <ModalContextProvider>
        <SidebarModal />
        <Sidebar />
      </ModalContextProvider>

      {loading && loading === true ? (
        <Spinner center={true} />
      ) : (
        <>
          <NewsResults data={data.news} />
          <FinanceResults data={data.quotes} />
        </>
      )}
    </div>
  );
}

export default App;
