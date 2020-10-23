import React, { useState, useEffect } from "react";
import "./styles.css";
import { BreakingNews as GetNews } from "../../Utils/BreakingNews";

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

function BreakingNews() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  useEffect(() => {
    Promise.resolve(GetNews()).then((item) => {
      if (item) setPosts(item.item);
    });
  }, []);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {currentPosts.length > 1 && (
        <>
          <h1>Breaking News</h1>
          <div className="breaking-news-container my-5">
            {currentPosts &&
              currentPosts.map(({ title, description, link, guid }) => {
                return (
                  <div class="card not-complete-list-card" key={guid}>
                    <div class="card-body not-complete-list-title" id={guid}>
                      <h5>{title}</h5>
                      <p>{description}</p>
                      <a href={link} target="_blank">
                        <small>Read More</small>
                      </a>
                    </div>
                  </div>
                );
              })}
          </div>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
          />
        </>
      )}
    </>
  );
}

export default BreakingNews;
