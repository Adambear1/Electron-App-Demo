import axios from "axios";

const BreakingNews = async () => {
  const options = {
    method: "GET",
    url: "https://rapidapi.p.rapidapi.com/api/yahoo/ne/news/AAPL",
    headers: {
      "x-rapidapi-host": process.env.REACT_APP_NEWS,
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

export { BreakingNews };
