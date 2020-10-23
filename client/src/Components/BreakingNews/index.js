import React, { useState, useEffect } from "react";
import firebaseDB from "../../Config";
import { uuid } from "uuidv4";
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
  const [saved, setSaved] = useState(null);
  useEffect(() => {
    Promise.resolve(GetNews()).then((item) => {
      if (item) setPosts(item.item);
    });
  }, []);
  const saveArticle = (e) => {
    e.preventDefault();
    firebaseDB
      .ref()
      .child("saveArticles")
      .push()
      .set({
        title: e.target.name,
        link: e.target.id,
      })
      .then((data) => {
        setSaved(true);
        setTimeout(() => {
          setSaved(false);
        }, 2000);
      });
  };
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
                  <div class="card breakingNews-card" key={guid}>
                    <div class="card-body breakingNews-title" id={guid}>
                      <h5>{title}</h5>
                      <p>{description}</p>
                      <a
                        id={link}
                        name={title}
                        onClick={saveArticle}
                        className="mr-3"
                      >
                        Save
                      </a>
                      <a href={link} target="_blank">
                        Read More
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
