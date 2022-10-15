import React, { useEffect } from "react";
import Container from "../utils/Container";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "./Searchbar.css";

type SearchProps = {
  searchCountry?: string;
  selectRegion?: string;
  setSearchCountry: (e: any) => void;
  setSelectRegion: (e: any) => void;
  darkMode?: boolean;
};

const Searchbar = (props: SearchProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.selectRegion) {
      return navigate(`/region/${props.selectRegion}`);
    }
  }, [props.selectRegion, navigate]);

  return (
    <Container>
      <div className="search">
        <div
          className={`${
            props.darkMode ? "bg-input text-light" : "bg-white"
          } search--left`}
        >
          <input
            type="text"
            name=""
            id=""
            className={`${
              props.darkMode ? "bg-input text-light" : "bg-white"
            } searchControl`}
            value={props.searchCountry}
            onChange={(e) => {
              props.setSearchCountry(e.target.value);
            }}
            placeholder="Search Country..."
          />
          <BiSearch
            fontSize={24}
            style={{ marginRight: "12PX", opacity: "0.4", cursor: "pointer" }}
          />
        </div>
        <div
          className={`${
            props.darkMode ? "bg-input text-light" : "bg-white"
          } search--right`}
        >
          <select
            id="select"
            className={`${
              props.darkMode ? "bg-input text-light" : "bg-white"
            } select-country`}
            value={props.selectRegion}
            onChange={(e) => props.setSelectRegion(e.target.value)}
          >
            <option defaultValue="">Select Region</option>
            <option value="africa">Africa</option>
            <option value="america">America</option>
            <option value="europe">Europe</option>
            <option value="asia">Asia</option>
          </select>
        </div>
      </div>
    </Container>
  );
};

export default Searchbar;
