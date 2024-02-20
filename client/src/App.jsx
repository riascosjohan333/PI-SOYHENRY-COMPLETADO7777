import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Landing from "./views/landing/landing";
import Home from "./views/home/home";
import Detail from "./views/detail/detail";
import Create from "./views/form/form";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Landing} />
        <Route path="/home" Component={Home} />
        <Route path="/countries/:id" Component={Detail} />
        <Route path="/create" Component={Create} />
      </Routes>
    </div>
  );
}

export default App;
