import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css";
import GameInstance from "./GameInstance";
/* 
Uses https://jsfiddle.net/zL4vmq0L/ from https://stackoverflow.com/questions/46556366/react-js-design-an-app-with-controls-to-move-an-object
*/
export default function App() {
  return (
    <div className="App">
      <GameInstance />
    </div>
  );
}
