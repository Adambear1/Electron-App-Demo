import axios from "axios";

const GetStockSMAData = async (i) => {
  const options = {
    method: "GET",
    url: "https://rapidapi.p.rapidapi.com/query",
    params: {
      interval: "5min",
      series_type: "close",
      function: "SMA",
      symbol: i,
      time_period: "60",
      datatype: "json",
    },
    headers: {
      "x-rapidapi-host": process.env.REACT_APP_SMA,
      "x-rapidapi-key": process.env.REACT_APP_KEY,
    },
  };

  const response = await axios
    .request(options)
    .then(({ data }) => {
      return data;
    })
    .catch(function (error) {
      console.error(error);
    });
  const data = await response;
  return data;
};
export default GetStockSMAData;
