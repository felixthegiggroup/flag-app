import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import CountryDetail from "./components/CountryDetail";
import Navbar from "./components/Navbar";
import CountryRegion from "./components/CountryRegion";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/country/:code" element={<CountryDetail />} />
        <Route path="/region/:region" element={<CountryRegion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
