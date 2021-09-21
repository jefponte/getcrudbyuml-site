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
import WithLineNumbers from './WithLineNumbers';

const code = `
{
  "nome": "Store",
  "objetos": [
    {
      "nome": "Product",
      "atributos": [
        {
          "nome": "id",
          "tipo": "Int",
          "indice": "PRIMARY"
        },
        {
          "nome": "description",
          "tipo": "string",
          "indice": ""
        },
        {
          "nome": "price",
          "tipo": "float",
          "indice": ""
        }
      ]
    },
    {
      "nome": "User",
      "atributos": [
        {
          "nome": "id",
          "tipo": "Int",
          "indice": "PRIMARY"
        },
        {
          "nome": "name",
          "tipo": "string",
          "indice": ""
        },
        {
          "nome": "email",
          "tipo": "string",
          "indice": ""
        }
      ]
    }
  ]
}
  `;
  const sql = `Clique no Botão para gerar o SQL`;
  
  const hightlightWithLineNumbers = (input, language) =>
    highlight(input, language)
      .split("\n")
      .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
      .join("\n");

 
  
  function PanelForm() {
    const [codeValue, setCodeValue] = useState(code);
    const [sqlValue, setSqlValue] = useState(sql);
    const [dataCode, setDataCode] = useState();

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
                //console.log("Success:", data);
                setDataCode(data);
                setSqlValue(data['files']['database_sqlite.sql']);
            })
            .catch((error) => {
                console.error("Error:", error);
            });

    }
    return (
        <>
        {console.log(dataCode)}
        
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
      {dataCode === undefined ? <p>Clique no botão para gerar o codigo</p> : 
      <>
        <Typography
          component="h2"
          variant="h5"
          align="center"
          color="text.primary"
          gutterBottom
        >
          CREATE Sqlite
         
        </Typography>
        <WithLineNumbers codigo={dataCode.files.database_sqlite}/>
        <Typography
          component="h2"
          variant="h5"
          align="center"
          color="text.primary"
          gutterBottom
        >
          CREATE PostgreSQL
         
        </Typography>
        <WithLineNumbers codigo={dataCode.files.database_pg}/>
        <Typography
          component="h2"
          variant="h5"
          align="center"
          color="text.primary"
          gutterBottom
        >
          CREATE MySQL
         
        </Typography>
        <WithLineNumbers codigo={dataCode.files.database_mysql}/>
        
      </>}
      
      

  
      
  </Grid>
  
</Grid>
</Container>
      </>
    );
  }
  export default PanelForm;
  