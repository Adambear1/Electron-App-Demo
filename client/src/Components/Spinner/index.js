import React from "react";

function Spinner({ size, center }) {
  return (
    <div class={` ${center && "d-flex justify-content-center"}`}>
      <div class={`spinner-border spinner-border-${size}`} role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;
