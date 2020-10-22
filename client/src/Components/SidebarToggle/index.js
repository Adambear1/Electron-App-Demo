import React from "react";

function SidebarToggle() {
  const openNav = () => {
    document.getElementById("mySidenav").style.width = "200px";
  };

  return (
    <span style={{ fontSize: "30px", cursor: "pointer" }} onClick={openNav}>
      &#9776;
    </span>
  );
}

export default SidebarToggle;
