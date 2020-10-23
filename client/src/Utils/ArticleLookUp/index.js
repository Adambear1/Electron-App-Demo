import axios from "axios";

const ArticleLookUp = async ({ begin_date, end_date, value, filter }) => {
  if (begin_date && end_date) {
    const options = {
      method: "GET",
      url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=${begin_date}&end_date=${end_date}&q=${value}&sort=${filter}&api-key=${process.env.REACT_APP_NYT_KEY}`,
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
  } else {
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
  }
};

export { ArticleLookUp };
