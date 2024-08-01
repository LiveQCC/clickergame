import React, { useState, useEffect } from 'react';

const socket = new WebSocket('ws://localhost:8080');

function FightButton({ side, count, setCount }) {
    useEffect(() => {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (side === 'left') {
          setCount(data.countL);
        }
      };
    }, [side, setCount]);
  
    const handleClick = () => {
      console.log(`The ${side} button was clicked! ${count}`);
      const newCount = count + 1;
      setCount(newCount);
      socket.send(JSON.stringify({ count: newCount, side }));
    };
  
    return (
      <div>
        <button onClick={handleClick}> Fight </button>
        <p> You clicked {count} times </p>
      </div>
    );
  }
  
  export default FightButton;