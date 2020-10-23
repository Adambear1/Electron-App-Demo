import React, { useState } from "react";
import { ArticleLookUp } from "../../Utils/ArticleLookUp";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

function Archives() {
  const [posts, setPosts] = useState([]);

  const [articles, setArticles] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const searchArticles = async (e) => {
    e.preventDefault();
    console.log(articles);
    let search = ArticleLookUp(articles);
    let data = await Promise.resolve(search).then(({ response }) => {
      const { docs } = response;
      console.log(docs);
      setPosts(docs);
    });
  };
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Archives</h1>
      <div className="row">
        <input
          class="form-control mr-sm-2"
          name="value"
          type="search"
          placeholder="Search Article"
          aria-label="Search Article...."
          onInput={(e) => {
            setArticles({ ...articles, [e.target.name]: e.target.value });
          }}
        />
        <select
          class="form-control"
          id="exampleFormControlSelect1"
          name="filter"
          onChange={(e) => {
            setArticles({ ...articles, [e.target.name]: e.target.value });
          }}
        >
          <option selected="true">-Select-</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="relevance">Relevance</option>
        </select>
        <input
          type="date"
          name="begin_date"
          label="Begin Date"
          onChange={(e) => {
            console.log(e.target.value);
            // setArticles({ ...articles, [e.target.name]: e.target.value });
          }}
        />
        <input
          type="date"
          name="end_date"
          label="End Date"
          onChange={(e) => {
            setArticles({ ...articles, [e.target.name]: e.target.value });
          }}
        />

        <button
          type="submit"
          className="btn btn-light"
          onClick={searchArticles}
        >
          Search
        </button>
      </div>

      <div className="row">
        <div className="col-12">
          {/* <div className="card-group"> */}
          {currentPosts &&
            currentPosts.map(
              (
                { abstract, headline, multimedia, source, web_url, _id },
                index
              ) => (
                <div class="card not-complete-list-card" key={_id}>
                  <div class="card-body not-complete-list-title" id={_id}>
                    <h5>
                      {headline.main}
                      {"  "}({source})
                    </h5>
                    <p>{abstract}</p>
                    <a href={web_url} target="_blank">
                      <small>Read More</small>
                    </a>
                  </div>
                </div>
              )
            )}
          {/* </div> */}
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
}

export default Archives;
