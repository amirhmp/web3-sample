import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Install from "./components/Install";
import Home from "./components/Home";

function App() {
  if ((window as any).ethereum) {
    return <Home />;
  } else {
    return <Install />;
  }
}

export default App;
