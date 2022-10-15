import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import CountryDetail from "./components/CountryDetail";
import Navbar from "./components/Navbar";
import CountryRegion from "./components/CountryRegion";
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <BrowserRouter>
      <Navbar setDarkMode={setDarkMode} darkMode={darkMode} />
      <Routes>
        <Route path="/" index element={<Home darkMode={darkMode} />} />
        <Route
          path="/country/:code"
          element={<CountryDetail darkMode={darkMode} />}
        />
        <Route
          path="/region/:region"
          element={<CountryRegion darkMode={darkMode} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
