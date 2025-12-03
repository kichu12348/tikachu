import React from 'react'
import './App.css'
import Game from './components/Game'

console.clear();

function App():React.JSX.Element {

  React.useEffect(()=>{
    const img = new Image();
    img.src = '/actors/run_1.webp';
    img.onload = () => {
      console.log('run 1 loaded');
    }
    img.src = '/actors/run_2.webp';
    img.onload=()=>{
      console.log('run 2 loaded');
    }
  },[])

  return (
    <div className="App">
      <Game />
    </div>
  )
}

export default App
