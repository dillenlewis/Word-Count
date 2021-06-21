import React from 'react'
import './App.css';

function App() {
  const [text, setText] = React.useState("")
  const [characterCount, setCharacterCount] = React.useState(null)
  const [wordCount, setWordCount] = React.useState(null)
  const [sentenceCount, setSentenceCount] = React.useState(null)
  const [paragraphCount, setParagraphCount] = React.useState(null)
  const [bigramsCount, setBigramsCount] = React.useState(null)
  
  const letterSet = new Set(['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'])

  const sentenceEndersSet = new Set(['.', '?', '!'])


  const findCharacterCount = (arr) => {
    setCharacterCount(arr.length)
  }

  const findWordCount = (arr) => {
    let tempWord = '';
    const holdWords = []

    for(let i = 0; i < arr.length; i++){
      if(arr[i] === ' ' || i === arr.length-1){
        for(let a = 0; a < tempWord.length; a++){
          if(letterSet.has(tempWord[a].toUpperCase())){
            holdWords.push(tempWord)
            tempWord = ''
            break;
         }
        }
      }else{
        tempWord += arr[i]
      }
    }

    setWordCount(holdWords.length)


    const bigramObj = {}
    let tempGram = ''
    let gramCount = 0

    for(let i = 0; i < holdWords.length; i++){
      if(i !== holdWords.length-1) { tempGram = holdWords[i]+holdWords[i+1] }

      if(tempGram in bigramObj){
        continue
      }else{
        bigramObj[tempGram] = 1;
        gramCount++
      }
    }

    setBigramsCount(gramCount)
  }

  const findSentenceCount = (arr) => {
    let tempSen = ''
    const holdSenCount = []

    for(let i = 0; i < arr.length; i++){
      if((sentenceEndersSet.has(arr[i]) && arr[i+1] === ' ') || (sentenceEndersSet.has(arr[i]) && arr[i+1] === '\n') || (sentenceEndersSet.has(arr[i]) && i === arr.length-1)){
        holdSenCount.push(tempSen)
        tempSen = ''
      }else{
        tempSen += arr[i]
      }
    }

    setSentenceCount(holdSenCount.length)
  }


  const findParagraphCount = () => {
    const holdParaCount = text.split('\n')
    let actualPara = 0;

    holdParaCount.forEach(element => {
      if(element !== '') {actualPara++}
    })

    setParagraphCount(actualPara)
  }

  const onButtonClick = ()=> {
    const textArr = text.split('')

    findCharacterCount(textArr)
    findWordCount(textArr)
    findSentenceCount(textArr)
    findParagraphCount()
  }

  return (
    <div>
      <div className="resultscreen">
        <p className="element">Character Count: {characterCount}</p>
        <p className="element">Word Count: {wordCount}</p>
        <p className="element">Sentence Count: {sentenceCount}</p>
        <p className="element">Paragraph Count: {paragraphCount}</p>
        <p className="element">Bigrams Count: {bigramsCount}</p>
      </div>
        <div className="heading">
          <p className="headingtext">Please enter the text below</p>
        </div>
        <div className="dataholder">
          <textarea value={text} onChange={(event) => setText(event.target.value)} id="dataspace" name="dataspace" className="dataspace" autoFocus rows="20" cols="100"></textarea>
        </div>
        <div className="buttonclk">
          <button onClick={onButtonClick}>Find Word Count</button>
        </div>
    </div>
  );
}

export default App;
