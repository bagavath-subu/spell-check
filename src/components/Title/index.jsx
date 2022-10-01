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
    </div>
  );
});

export default Title;
