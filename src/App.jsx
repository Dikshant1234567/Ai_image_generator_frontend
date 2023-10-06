import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

// assests
import logo from "./assests/logo.svg"
// components
import Home from "./components/Home";
import Create from "./components/Create";

function App() {
  return (
    <section className="h-full max-w-7xl  m-auto ">

      <header className="flex items-center justify-between  p-4 bg-white">
        <Link to={`/`} >
          <img src={logo} alt="icon" className="cursor-pointer w-32" />
        </Link>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-2xl">
          <Link to={`/create`}>Create</Link>
        </button>
      </header>

      <hr className="bg-gray-500 h-[1px]" />

      <main>
        <Routes>
          <Route element={<Home />} path="/"></Route>
          <Route element={<Create />} path="/create"></Route>
        </Routes>
      </main>
    </section>
  );
}

export default App;
