import axios from "axios";

const GetData = async (i) => {
  const options = {
    method: "GET",
    url: "https://rapidapi.p.rapidapi.com/auto-complete",
    params: { q: i, region: "US" },
    headers: {
      "x-rapidapi-host": process.env.REACT_APP_STOCKS,
      "x-rapidapi-key": process.env.REACT_APP_KEY,
    },
  };

  const response = await axios
    .request(options)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
  const data = await response;
  return data;
};

export default GetData;
