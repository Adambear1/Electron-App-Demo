import axios from "axios";

const SummarizeArticle = async (i) => {
  console.log(i);
  const options = {
    method: "POST",
    url: "https://rapidapi.p.rapidapi.com/text-summarizer",
    headers: {
      "content-type": "application/json",
      "x-rapidapi-host": process.env.REACT_APP_NEWS,
      "x-rapidapi-key": process.env.REACT_APP_KEY,
    },
    data: {
      url: i,
      text: "",
      sentnum: 1,
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

export default SummarizeArticle;
