import React, { useState } from "react";

import "./style.css";
import { useDebounce } from "../../hooks";
import ContentEditable from "../ContentEditable";
import { getTextSegments, highlightText, replaceWord } from "../../utils";
import { spellCheck } from "../../API";
import SuggestionMenu from "../SuggestionMenu";

const DEBOUNCE_INTERVAL = 1000;

const Document = () => {
  const [content, setContent] = useState("");

  const [html, setHTML] = useState("");

  const check = () => {
    const parsedDoc = getTextSegments(content);
    if (!parsedDoc) return;
    spellCheck(parsedDoc).then(({ response: { errors } }) => {
      const wordsToHighlight = errors.reduce(
        (data, { bad, better, length: endIndex, offset: startIndex }) => ({
          ...data,
          [bad]: { better, startIndex, endIndex: startIndex + endIndex },
        }),
        {}
      );
      const highlightHTMLContent = highlightText(parsedDoc, wordsToHighlight);

      setHTML(highlightHTMLContent);
    });
  };

  useDebounce(check, DEBOUNCE_INTERVAL, [content]);

  const onChangeHandler = (value) => {
    setContent(value);
  };

  const clickHandler = (target, value) => {
    const parsedDoc = getTextSegments(content);
    const replacedText = replaceWord(
      parsedDoc,
      value,
      target?.start,
      target?.end
    );
    setContent(replacedText);
  };

  return (
    <div className="document">
      <ContentEditable onChange={onChangeHandler} value={html} />
      <SuggestionMenu clickHandler={clickHandler} />
    </div>
  );
};

export default Document;
