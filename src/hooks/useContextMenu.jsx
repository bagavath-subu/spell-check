import { useCallback, useEffect, useState } from "react";

export const useContextMenu = () => {
  const [targetData, setTargetData] = useState([]);

  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);

  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      if (event.target.nodeName !== "SPAN") return;

      const { dataset } = event.target;
      setTargetData({
        ...dataset,
        suggestions: dataset.suggestions.split(","),
      });

      setAnchorPoint({
        x: event.target.offsetLeft,
        y: event.target.offsetTop + event.target.offsetHeight,
      });
      setShow(true);
    },
    [setShow, setAnchorPoint]
  );

  const handleClick = useCallback(() => (show ? setShow(false) : null), [show]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  });
  return { anchorPoint, show, targetData };
};
