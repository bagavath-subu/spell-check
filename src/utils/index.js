export const editCaretPosition = (element) => {
  const target = document.createTextNode("");
  element.appendChild(target);
  const isTargetFocused = document.activeElement === element;
  if (target !== null && target.nodeValue !== null && isTargetFocused) {
    var sel = window.getSelection();
    if (sel !== null) {
      var range = document.createRange();
      range.setStart(target, target.nodeValue.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    if (element instanceof HTMLElement) element.focus();
  }
};

export const getTextSegments = (html) => {
  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(html, "text/html");
  return parsedDocument.all[0].textContent;
};

export const highlightText = (text, highlighted) => {
  const wordsToHighlight = Object.keys(highlighted);
  const words = text.split(" ");
  const output = words.map((word) => {
    if (wordsToHighlight.includes(word)) {
      const { startIndex, endIndex, better } = highlighted[word];

      return `<span class="highlight" data-suggestions='${better}' data-start='${startIndex}' data-end='${endIndex}'>${word}</span>`;
    } else {
      return word;
    }
  });
  return output.join(" ");
};

export const replaceWord = (target, source, startIndex, endIndex) =>
  target.slice(0, startIndex) + source + target.slice(endIndex);
