import React, { useState } from "react";
import "../styles.css";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const code = `
{"id":148,"nome":"Store","objetos":[{"id":327,"nome":"Product","id_software_objetos":148,"atributos":[{"id":1305,"nome":"id","tipo":"Int","indice":"PRIMARY","id_objeto_atributos":327},{"id":1306,"nome":"description","tipo":"string","indice":"","id_objeto_atributos":327},{"id":1307,"nome":"price","tipo":"float","indice":"","id_objeto_atributos":327}]},{"id":328,"nome":"User","id_software_objetos":148,"atributos":[{"id":1302,"nome":"id","tipo":"Int","indice":"PRIMARY","id_objeto_atributos":328},{"id":1303,"nome":"name","tipo":"string","indice":"","id_objeto_atributos":328},{"id":1304,"nome":"email","tipo":"string","indice":"","id_objeto_atributos":328}]}]}

  `;
  const sql = `Aqui vamos gerar o SQL
OK?`;
  
  const hightlightWithLineNumbers = (input, language) =>
    highlight(input, language)
      .split("\n")
      .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
      .join("\n");
  
  function PanelForm() {
    const [codeValue, setCodeValue] = useState(code);
    const [sqlValue, setSqlValue] = useState(sql);

    function testeDeBlur(){

            const data = JSON.parse(codeValue);

            fetch("http://localhost/getcrudbyuml/getcrudbyuml-core/src/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                setSqlValue(data['files']['database_sqlite.sql']);
            })
            .catch((error) => {
                console.error("Error:", error);
            });

    }
    return (
        <>
<Container disableGutters maxWidth="lg" component="main" sx={{ pt: 5, pb: 6 }}>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          color="text.primary"
          gutterBottom
        >
          ExempleSoftware
         
        </Typography>
         <Button variant="contained" onClick={testeDeBlur} color="success">Get Code</Button> <br/> <br/>
  

<Grid container spacing={2}>
  <Grid item xs={6}>
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
  </Grid>
  <Grid item xs={6}>
    {/*<Button variant="contained">Add Class</Button> 
    
    <Button variant="contained" color="secondary">Save Export</Button>
      */}
      
  <Editor
        onBlur={testeDeBlur}
        value={sqlValue}
        onValueChange={sql => setSqlValue(sql)}
        highlight={sql => hightlightWithLineNumbers(sql, languages.js)}
        padding={10}
        textareaId="sqlArea"
        className="editor"
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 18,
          outline: 0
        }}
      />
      
  </Grid>
  
</Grid>
</Container>
      </>
    );
  }
  export default PanelForm;
  