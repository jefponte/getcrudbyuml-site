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

const code = `[
  {
    "name": "Product",
    "attributes": [
      {
        "name": "id",
        "type": "Int",
        "index": "PRIMARY"
      },
      {
        "name": "description",
        "type": "string"
      },
      {
        "name": "price",
        "type": "float"
      }
    ]
  },
  {
    "name": "User",
    "attributes": [
      {
        "name": "id",
        "type": "Int",
        "index": "PRIMARY"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "email",
        "type": "string"
      }
    ]
  }
]
  `;
  
  
  const hightlightWithLineNumbers = (input, language) =>
    highlight(input, language)
      .split("\n")
      .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
      .join("\n");

 
  
  function PanelForm() {
    const [codeValue, setCodeValue] = useState(code);
    
    const [dataCode, setDataCode] = useState();

    function testeDeBlur(){

            const data = JSON.parse(codeValue);
            const data2 = {nome: "softwareTeste", objects: data};

            fetch("https://core.getcrudbyuml.com/api/software", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data2),
            })
            .then((response) => response.json())
            .then((data) => {
                
                setDataCode(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });

    }
    return (
        <>
        {console.log(dataCode)}
<Container disableGutters maxWidth="lg" component="main" sx={{ pl: 7, pr: 7, pt: 5, pb: 6 }}>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          color="text.primary"
          gutterBottom
        >
          ExempleSoftware
         
        </Typography>
        <Button variant="contained">Add Class</Button> 
        <Button variant="contained" color="secondary">Diagram</Button>
        <Button variant="contained" onClick={testeDeBlur} color="success">Get Code</Button> <br/> <br/>
  

<Grid container spacing={2}>
  <Grid item md={6} sm={12} xs={12}>
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
  <Grid item md={6} sm={12}  xs={12}>
    {/*
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
        <Typography
          component="h2"
          variant="h5"
          align="center"
          color="text.primary"
          gutterBottom
        >
          SELECT
         
        </Typography>
        <WithLineNumbers codigo={dataCode.files.dml}/>
        
      </>}
      
      

  
      
  </Grid>
  
</Grid>
</Container>
      </>
    );
  }
  export default PanelForm;
  