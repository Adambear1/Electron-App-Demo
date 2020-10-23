import React, { useEffect, useContext, useState } from "react";
import firebaseDB from "../../Config";
import { ModalContext } from "../../Context/ModalContextProvider";
import "./styles.css";
function SidebarModal() {
  const { value, setValue } = useContext(ModalContext);
  const [state, setState] = useState();
  useEffect(() => {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    span.addEventListener("click", () => {
      modal.style.display = "none";
    });
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }, []);
  useEffect(() => {
    switch (value.value) {
      case "savedArticles":
        savedArticles();
        return;
    }
  }, [value]);
  function savedArticles() {
    const data = async () => {
      return firebaseDB.child("saveArticle").on("value", (snapshot) => {
        console.log(snapshot.val());
        return Promise.resolve(snapshot.val()).then((data) => {
          console.log(data);
          return setState({ ...state, data });
        });
      });
    };
    data();
    setState({
      title: "Articles Saved",
    });
  }
  return (
    <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <p>{state && state.title}</p>
        <p>{state && state.data && state.data}</p>
      </div>
    </div>
  );
}

export default SidebarModal;
