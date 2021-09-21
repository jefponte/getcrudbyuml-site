import React, { useState } from "react";
import ReactDOM from "react-dom";
import Home from './pages/Home';
import "./styles.css";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";


const code = `function add(a, b) {
  return a + b;
}

const a = 123;
`;

const hightlightWithLineNumbers = (input, language) =>
  highlight(input, language)
    .split("\n")
    .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
    .join("\n");

function App() {
  const [codeValue, setCodeValue] = useState(code);

  return (
      <>
      <Home/>
      <Editor
      value={codeValue}
      onValueChange={code => setCodeValue(code)}
      highlight={code => hightlightWithLineNumbers(code, languages.js)}
      padding={10}
      textareaId="codeArea"
      className="editor"
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 18,
        outline: 0
      }}
    />

    <Editor
      value={codeValue}
      onValueChange={code => setCodeValue(code)}
      highlight={code => hightlightWithLineNumbers(code, languages.js)}
      padding={10}
      textareaId="codeArea"
      className="editor"
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 18,
        outline: 0
      }}
    />
    </>
  );
}
export default App;
