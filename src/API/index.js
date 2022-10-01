import textgears from "textgears-api";
const textgearsApi = textgears("y4A4UCCP1BEEzXk4", {
  language: "en-US",
});

export const spellCheck = (text) => textgearsApi.checkSpelling(text);
