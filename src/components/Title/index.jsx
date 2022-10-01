import React from "react";

const Title = React.memo(() => {
  return (
    <div className="title">
      <img
        className="logo"
        width="150px"
        src={"/images/spell-check.png"}
        alt="logo"
      />
      <h3>
        A Simple Tool to Correct <span className="highlight">Mistkes</span>
      </h3>
    </div>
  );
});

export default Title;
