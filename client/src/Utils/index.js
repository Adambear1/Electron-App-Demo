import axios from "axios";

function GetData(data) {
  const options = {
    method: "GET",
    url: "https://rapidapi.p.rapidapi.com/auto-complete",
    params: { q: data, region: "US" },
    headers: {
      "x-rapidapi-host": process.env.REACT_APP_API_HOST,
      "x-rapidapi-key": process.env.REACT_APP_API_KEY,
    },
  };

  axios
    .request(options)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export default GetData;
