import React from "react";
import { useContextMenu } from "../../hooks";
import "./style.css";

const SuggestionMenu = React.memo(({ clickHandler }) => {
  const { anchorPoint, show, targetData } = useContextMenu();

  return (
    <>
      {show && (
        <ul
          className="menu"
          style={{
            top: anchorPoint.y,
            left: anchorPoint.x,
            zIndex: 10,
          }}
        >
          {targetData?.suggestions?.map((menu) => (
            <li onClick={() => clickHandler(targetData, menu)}>{menu}</li>
          ))}
        </ul>
      )}
    </>
  );
});

export default SuggestionMenu;
