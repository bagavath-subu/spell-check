import React, { useLayoutEffect, useRef } from "react";
import { editCaretPosition } from "../../utils";

const ContentEditable = ({ onChange, value }) => {
  const ref = useRef();

  useLayoutEffect(() => {
    const editor = ref.current;
    editCaretPosition(editor);
  }, [value]);

  return (
    <div
      className="editor"
      placeholder="Type something..."
      ref={ref}
      contentEditable={true}
      spellCheck={false}
      onInput={({ target: { innerHTML } }) => onChange(innerHTML)}
      dangerouslySetInnerHTML={{ __html: value }}
    ></div>
  );
};

export default ContentEditable;
