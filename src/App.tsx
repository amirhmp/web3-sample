import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Install from "./components/Install";
import Home from "./components/Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      {(window as any).ethereum ? <Home /> : <Install />}
      <ToastContainer />
    </div>
  );
}

export default App;
