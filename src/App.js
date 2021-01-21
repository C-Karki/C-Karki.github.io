// [[file:src.org::*~src/App.js~][~src/App.js~:1]]
import React from 'react';
import { Header } from './components/Header';
// import { Info } from './components/Info';
import { Time } from './components/Time';
import './App.css';

function App() {
  return (
    <div>
    <div>
      <Header />
      <Time />
      {/* <div className="container"> */}
	{/* <Info /> */}
      </div>
    </div>
  );
}

export default App;
// ~src/App.js~:1 ends here
