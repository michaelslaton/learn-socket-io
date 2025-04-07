import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import Input from './components/Input';

function App() {
  const [score, setScore] = useState({});
  const [allScores, setAllScores] = useState([])
  const socket = io('localhost:3000');

  function connectSocket(){
    socket.on('connect', ()=>{
      console.log(socket);
    });
  };

  useEffect(()=>{
    connectSocket();
  },[]);

  function handleInput(event){
    let {name, value} = event.target;
    // console.log({[name] : value})
    let currentObject = {[name] : value}

    setScore((prev)=> ({...prev, ...currentObject}));
  }

  function sendScores () {
    socket.emit('scores', score);

    socket.on('playerScores', (playerScores)=>{
      setAllScores(playerScores);
    })
  };

  return (
    <>
      <h1>React Multiplayer Dashboard</h1>
      
      <Input name='name' placeholder={`Enter your Name`} handleInput={handleInput}/>

      <Input name='score' placeholder={`Enter your Score`} handleInput={handleInput}/>

      <button
        className='send-scores'
        onClick={sendScores}
      >
        Publish Score
      </button>
      {allScores.length > 0 && <table>
        <tr>
        <th>Name</th>
        <th>Score</th>
        </tr>
        <tbody>
          {allScores.map((score)=>(
            <tr>
              <td>{score?.name}</td>
              <td>{score?.score}</td>
            </tr>
          ))}
        </tbody>
      </table>}
    </>
  )
}

export default App
