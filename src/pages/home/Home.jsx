import "./home.css"
import React, { useEffect, useRef, useState } from 'react'

const Home = () => {
  const [compNum, setCompNum] = useState("");
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [playerScore, setPlayerScore] = useState(JSON.parse(localStorage.getItem("playerScore")) || 0);
  const [computerScore, setComputerScore] = useState(JSON.parse(localStorage.getItem("computerScore")) || 0);
  const [initialRender, setInitialRender] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false);

  
  const guessRef = useRef();

  

  useEffect(()=>{
    if (initialRender) {
      setInitialRender(false); //prevents the useEffect from runnung on initial render
    }else{
      if (Number(guess) === compNum){
        setMessage("You win")
        setPlayerScore(playerScore + 1)
      }else{
        setMessage("You lose")
        setComputerScore(computerScore + 1)
      }
    }
    }, [compNum, guess, buttonClicked])


    useEffect(()=>{
      localStorage.setItem("playerScore", JSON.stringify(playerScore)) 
      localStorage.setItem("computerScore", JSON.stringify(computerScore)) 
    },[playerScore, computerScore]);

      



  //function to generate random number
  const randNum = () =>{
    return (Math.floor(Math.random() * 2));
  }
  

  //function that is fired on click of the button
  const handlePlay = () =>{

    setGuess(guessRef.current.value);

    setCompNum(randNum());

    setButtonClicked(!buttonClicked); //this is added as a dependency in the useEffect so that the useEffect fires everytime the it changes (the button is clicked), even if the computer number and user number don't change.

  }

  

  
   
  return (
    <div className="homeContainer">
      <div className="homeWrapper">
        <input type="number" ref={guessRef}  className="playInputField"/>
        <button onClick={handlePlay}> PLAY </button>

      <div className="playNumbers">
        <p>Computer Number: {compNum}</p>
        <p>Your Number: {guess}</p>
      </div>
        <p className="message">Message: {message}</p>
        <br />
        <p>Computer Score: {computerScore}</p>
        <p>Player Score: {playerScore}</p>
      </div>
    </div>
  )
}

export default Home
