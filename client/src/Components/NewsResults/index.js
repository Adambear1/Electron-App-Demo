import React, { useState, useEffect } from "react";
import firebaseDB from "../../Config";
import "./styles.css";
import SummarizeArticle from "../../Utils/SummarizeArticle";
import Spinner from "../Spinner";

function NewsResults({ data }) {
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
  const SaveArticle = (e) => {
    e.preventDefault();
    setSaving(true);
    console.log(e.target);
    let obj = { link: e.target.id };
    console.log(obj);
    firebaseDB
      .child("saveArticle")
      .push()
      .then((data) => {
        setSaving(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div style={{ maxHeight: "400px", overflow: "scroll" }}>
      {data &&
        data.map(({ link, uuid, providerPublishTime, title }) => (
          <>
            <button class="accordion" key={uuid} onClick={Summarize} id={link}>
              {title}
            </button>
            <div class="panel">
              <p>{text ? text : <Spinner center={true} />}</p>
              <ul className="accordion-footer">
                <li>
                  <a
                    onClick={SaveArticle}
                    target="_blank"
                    className="text-mute"
                  >
                    {saving && saving === true ? (
                      <Spinner size={"sm"} />
                    ) : (
                      <small id={link}>Save Article</small>
                    )}
                  </a>
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
  );
}

export default NewsResults;
