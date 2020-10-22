import axios from "axios";

const GetTopGainers = async () => {
  const options = {
    method: "GET",
    url: "https://rapidapi.p.rapidapi.com/api/yahoo/ga/topgainers",
    params: { start: "0" },
    headers: {
      "x-rapidapi-host": process.env.REACT_APP_TOP,
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

export default GetTopGainers;
