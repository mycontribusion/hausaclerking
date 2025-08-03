//import logo from './logo.svg';
//import './App.css';

import { useState } from "react";
import WelcomePage from "./WelcomePage";
import HausaClerking from "./HausaClerking";


function App() {
  const[display, setDisplay] = useState('welcome')

  const openAppDef = () => {
    setDisplay('openapp')
    console.log('open app working')
  }

  const backHome = () => {
    setDisplay('welcome')
    console.log('going back home')
  }

  return(
    <div>
      {display==='welcome' ? <WelcomePage openApp={openAppDef}/>:<HausaClerking backHome={backHome}/>}
    </div>
  )
}

export default App;
