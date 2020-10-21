import React, { useState } from "react";
import GetData from "./Utils";
import Search from "./Components/Search";

function App() {
  const [value, setValue] = useState({});
  const search = (e) => {
    e.preventDefault();
    let data = GetData(value);
    console.log(data);
  };
  return (
    <div className="container">
      <Search search={search} setValue={setValue} />
    </div>
  );
}

export default App;
