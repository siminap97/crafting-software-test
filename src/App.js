import "./App.css";
import { TextField, Box, Divider, Container, Button } from "@mui/material";

import { useState } from "react";

function App() {
  const [formWords, setFormWords] = useState("");
  const [formSentence, setFormSentence] = useState("");
  const [resultedSentances, setResultedSentances] = useState([]);
  const [result, setResult] = useState(false);

  const handleText = () => {
    const splitString = formWords.split(" ");
    let secondarySentence = formSentence;
    let finalSentances = [];

    // console.log()
    let duplicates = [];
    let dup = false;
    //find if there are words that contain other words
    for (let i = 0; i < splitString.length; i++) {
      for (let j = 0; j <= splitString.length; j++) {
        if (i != j && splitString[i] && splitString[j]) {
          if (splitString[j].includes(splitString[i])) {
            duplicates = [...duplicates, splitString[i]];
            duplicates = [...duplicates, splitString[j]];
            duplicates = [...new Set(duplicates)]; //make sure we don't duplicate words again
            console.log("Duplicates: " + duplicates);
            dup = true;
          }
        }
      }
    }
    let commonWords = splitString;
    for (let i = 0; i < duplicates.length; i++) {
      commonWords = commonWords.filter((e) => e !== duplicates[i]); // will remove duplicates and create a string only with common words
    }

    //find what common words are in our sentence
    let foundCommonWords = [];
    for (let i = 0; i < splitString.length; i++) {
      if (secondarySentence.includes(commonWords[i])) {
        foundCommonWords += commonWords[i] + " ";
        secondarySentence = secondarySentence.replace(commonWords[i], "");
      }
    }
    console.log(foundCommonWords);
    //find possible versions by duplicates
    let foundArraysOfDuplicates = [];
    if (dup) {
      for (let i = 0; i < duplicates.length; i++) {
        let foundDuplicates = [];
        let sentanceForDuplicates = secondarySentence;
        for (let j = 0; j < duplicates.length; j++) {
          if (sentanceForDuplicates.includes(duplicates[j])) {
            foundDuplicates += duplicates[j] + " ";
            sentanceForDuplicates = sentanceForDuplicates.replace(
              duplicates[j],
              ""
            );
          }
        }
        foundArraysOfDuplicates = [...foundArraysOfDuplicates, foundDuplicates];
      }
      //move the first element to the end of the array
      duplicates = [...duplicates, duplicates[0]];
      duplicates.shift();
      //create an array with all the posibilities
      for (let i = 0; i <= foundArraysOfDuplicates.length; i++) {
        if (foundArraysOfDuplicates[i]) {
          const array = foundArraysOfDuplicates[i].concat(foundCommonWords);
          finalSentances = [...finalSentances, array];
        }
      }
      setResultedSentances(finalSentances);
    } else {
      let onlyCommonWords = [];
      onlyCommonWords = [...onlyCommonWords, foundCommonWords];
      setResultedSentances(onlyCommonWords);
    }
    setResult(true);
  };

  return (
    <div className="App" class="body">
      <div className="test">
        <h1>Crafting Software test</h1>
        <h2>Solution done by Simina Popandron</h2>
        <Divider />
        <h5>This webpage can detect what words you want in a block of text</h5>
        <h10>
          For example: If you give the words "you", "wonderfull" and "wonder",
          and the block of text "youarewonderful", the program will detect two
          ways to split your sentence:
        </h10>
        <div
          dangerouslySetInnerHTML={{ __html: '1. "you", "wonderful" &nbsp;' }}
        />
        <div
          dangerouslySetInnerHTML={{ __html: '2. "you", "wonder" &nbsp;' }}
        />
        <h5>
          You will recieve all of the possiblie combinations of words detected
          in order to help you see what other sentences can be formed with those
          words.
        </h5>
        <Divider />
        <Container maxWidth="sm">
          <h5>Enter what words you would like to detect</h5>
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <TextField
              fullWidth
              label="Words"
              id="words"
              onChange={(e) => {
                setFormWords(e.target.value);
              }}
            />
          </Box>
        </Container>
        <Container maxWidth="sm">
          <h5>Enter your block of text</h5>
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <TextField
              fullWidth
              label="Sentence"
              id="sentence"
              onChange={(e) => {
                setFormSentence(e.target.value);
              }}
            />
          </Box>
        </Container>
        <Button variant="contained" color="secondary" onClick={handleText}>
          DETECT
        </Button>
        {result ? (
          <div>
            <h5>The results are:</h5>
            <ol>
              {resultedSentances.map((sentence) => {
                return <li>{sentence}</li>;
              })}
            </ol>
          </div>
        ) : (
          <div>Press the button to get the results!</div>
        )}
      </div>
    </div>
  );
}

export default App;
