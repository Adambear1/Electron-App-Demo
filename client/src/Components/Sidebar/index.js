import React, { useEffect, useContext } from "react";
import { ModalContext } from "../../Context/ModalContextProvider";
import "./styles.css";

function Sidebar() {
  const { value, setValue } = useContext(ModalContext);
  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };
  useEffect(() => {
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("myBtn");
    btn &&
      btn.addEventListener("click", () => {
        modal.style.display = "block";
      });
  });
  return (
    <div
      id="mySidenav"
      class="sidenav"
      style={{ zIndex: 200, textAlign: "center" }}
    >
      <a href="javascript:void(0)" class="closebtn" onClick={closeNav}>
        &times;
      </a>
      <button
        onClick={(e) => {
          setValue({ value: e.target.name });
          closeNav();
        }}
        id="myBtn"
        name="savedArticles"
        class="btn btn-light"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Saved Articles
      </button>
    </div>
  );
}

export default Sidebar;
