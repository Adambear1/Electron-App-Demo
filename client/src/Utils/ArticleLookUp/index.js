import axios from "axios";

const ArticleLookUp = async ({ value, filter }) => {
  const options = {
    method: "GET",
    url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${value}&sort=${filter}&api-key=${process.env.REACT_APP_NYT_KEY}`,
  };
  const response = await axios
    .request(options)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
  const data = await response;
  return data;
};

export { ArticleLookUp };
