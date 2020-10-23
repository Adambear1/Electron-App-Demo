import React, { useState, useEffect } from "react";
import firebaseDB from "../../Config";
import "./styles.css";
import SummarizeArticle from "../../Utils/SummarizeArticle";
import Spinner from "../Spinner";

function NewsResults({ data, name }) {
  // console.log(data && data);
  const [text, setText] = useState(null);
  const [saving, setSaving] = useState(null);
  const Summarize = (e) => {
    let data = SummarizeArticle(e.target.id);
    Promise.resolve(data).then((data) => {
      console.log(data);
      setText(data.sentences[0] + " " + data.sentences[1] + "..");
    });
  };
  useEffect(() => {
    var acc = document.getElementsByClassName("accordion");
    var i;
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
  }, [Summarize]);
  const saveArticle = (e) => {
    e.preventDefault();
    firebaseDB
      .ref()
      .child("saveArticles")
      .push()
      .set({
        title: e.target.getAttribute("name"),
        link: e.target.id,
      });
  };
  const saveStock = (e) => {
    e.preventDefault();
    firebaseDB.ref().child("saveStocks").push().set({
      stock: e.target.id,
    });
    e.target.textContent = "⭐";
  };
  return (
    <>
      {name && (
        <h1>
          {"Data for " + name[0].longname}
          <span
            role="img"
            arial-label="Save Stock to Favorites"
            id={name && name[0].longname}
            onClick={saveStock}
          >
            ✰{" "}
          </span>
        </h1>
      )}
      <div style={{ maxHeight: "400px", overflow: "scroll" }}>
        {data &&
          data.map(({ link, uuid, providerPublishTime, title }) => (
            <>
              <button
                class="accordion"
                key={uuid}
                onClick={Summarize}
                id={link}
              >
                {title}
              </button>
              <div class="panel">
                <p>{text ? text : <Spinner center={true} />}</p>
                <ul className="accordion-footer">
                  <li>
                    {saving && saving === true ? (
                      <Spinner size={"sm"} />
                    ) : (
                      <small
                        id={link}
                        name={title}
                        className="mr-3"
                        onClick={saveArticle}
                      >
                        Save Article
                      </small>
                    )}
                  </li>
                  <li>
                    {" "}
                    <a href={link} target="_blank" className="text-mute">
                      <small>Read More...</small>
                    </a>
                  </li>
                </ul>
              </div>
            </>
          ))}
      </div>
    </>
  );
}

export default NewsResults;
