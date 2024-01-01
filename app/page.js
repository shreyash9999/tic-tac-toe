'use client';
import React, { useState } from 'react'
import Navbar from '../Components/Navbar';


function Square({value,onSquareClick}){
  return(
    <button className='square' onClick={onSquareClick}>
      {value}
    </button>
  )
}

function Board({isNext, square, onPlay}) {
  function handleClick(i) {
    if(square[i] || calculateWinner(square)){
      return;
    }
    // const nextSquare = Array.isArray(square) ? square.slice() : Array(9).fill(null);

    const nextSquare = square.slice();
    if(isNext){
      nextSquare[i] = 'X';
    }else{
      nextSquare[i] = 'O';
    }
    onPlay(nextSquare);
  }

  const winner = calculateWinner(square);
  let status;
  if(winner){
    status = "Winner: " + winner;
  }else{
    status = "Next player: " + (isNext ? "X" : "O");
  }

  return (
  <>

<div className='board-dis'>
  <div className="board-row-sta">{status}</div>
  </div>
  <div className='board-row'>
    <Square value={square[0]} onSquareClick={()=>handleClick(0)}/>
    <Square value={square[1]} onSquareClick={()=>handleClick(1)}/>
    <Square value={square[2]} onSquareClick={()=>handleClick(2)}/>
  </div>
  <div className='board-row'>
    <Square value={square[3]} onSquareClick={()=>handleClick(3)}/>
    <Square value={square[4]} onSquareClick={()=>handleClick(4)}/>
    <Square value={square[5]} onSquareClick={()=>handleClick(5)}/>
  </div>
  <div className='board-row'>
    <Square value={square[6]} onSquareClick={()=>handleClick(6)}/>
    <Square value={square[7]} onSquareClick={()=>handleClick(7)}/>
    <Square value={square[8]} onSquareClick={()=>handleClick(8)} />
  </div>
  
  </>
)}

function calculateWinner(square) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (square[a] && square[a] === square[b] && square[a] === square[c]) {
      return square[a];
    }
  }
  return null;
}

export default function Game(){
  // const [isNext, setNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  const isNext = currentMove % 2 === 0;
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquare = history[currentMove];

  function handlePlay(nextSquare) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    // setNext(!isNext);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
    // setNext(nextMove % 2 === 0);
  }
  const moves = history.map((square, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <div className='desc'>
      <li className='info-no' key={move}>
        <button className='info' onClick={() => jumpTo(move)}>{description}</button>
      </li>
      </div>
    );
  });


  return(
    
    <div className='game'>
      <Navbar/>
      <div className='game-board'>
        <Board isNext={isNext} square={currentSquare} onPlay={handlePlay}/>
      </div>
      <div className='game-info'>
        <ol> {moves} </ol>
      </div>
    </div>

  )
}

