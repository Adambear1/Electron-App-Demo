import React, { useEffect, useContext, useState } from "react";
import firebaseDB from "../../Config";
import { ModalContext } from "../../Context/ModalContextProvider";
import "./styles.css";
function SidebarModal() {
  const { value, setValue } = useContext(ModalContext);
  const [articles, setArticles] = useState();
  const [stocks, setStocks] = useState();
  const [title, setTitle] = useState();
  const [crud, setCrud] = useState();
  useEffect(() => {
    try {
      var modal = document.getElementById("myModal");
      var span = document.getElementsByClassName("close")[0];
      span.addEventListener("click", () => {
        setValue("");
        modal.style.display = "none";
      });
      window.addEventListener("click", (e) => {
        if (e.target === modal) {
          setValue("");
          modal.style.display = "none";
        }
      });
    } catch (error) {
      console.log("");
    }
  }, []);
  useEffect(() => {
    console.log(value.value);
    switch (value.value) {
      case "savedArticles":
        savedArticles();
        setTitle("Saved Articles");
        return;
      case "savedStocks":
        savedStocks();
        setTitle("Saved Stocks");
        return;
    }
  }, [value, crud]);
  function savedArticles() {
    let arr = [];
    firebaseDB.ref().on("value", (snapshot) => {
      let obj = snapshot.val().saveArticles;
      for (var key in obj) {
        arr.push({ link: obj[key].link, title: obj[key].title, _id: key });
      }
      setArticles(arr);
    });
  }
  function savedStocks() {
    let arr = [];
    firebaseDB.ref().on("value", (snapshot) => {
      let obj = snapshot.val().saveStocks;
      for (var key in obj) {
        arr.push({ stock: obj[key].stock, _id: key });
      }
      setStocks(arr);
    });
  }
  function deleteInput(e) {
    setCrud(true);
    firebaseDB
      .ref("saveArticles/" + e.target.id)
      .set(null)
      .then((data) => {
        setCrud(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {articles ||
        (stocks && (
          <div id="myModal" class="modal">
            <div class="modal-content">
              <span class="close">&times;</span>
              {title && <h1>{title}</h1>}
              {articles &&
                articles.map(({ link, title, _id }) => (
                  <>
                    <div class="card " key={_id}>
                      <div class="card-body">
                        <div class="row saved-modal">
                          {" "}
                          <a href={link} target="_blank">
                            {title}
                          </a>
                          <span
                            role="img"
                            aria-label="delete"
                            onClick={deleteInput}
                            id={_id}
                          >
                            ❌
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              {stocks &&
                stocks.map(({ stock, _id }) => (
                  <>
                    <div class="card " key={_id}>
                      <div class="card-body">
                        <div class="row saved-modal">
                          <a>{stock}</a>
                          <span
                            role="img"
                            aria-label="delete"
                            onClick={deleteInput}
                            id={_id}
                          >
                            ❌
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </div>
        ))}
    </>
  );
}

export default SidebarModal;
