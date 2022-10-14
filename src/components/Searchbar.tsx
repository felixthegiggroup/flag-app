import React, { useEffect } from "react";
import Container from "../utils/Container";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

type SearchProps = {
  searchCountry?: string;
  selectRegion?: string;
  setSearchCountry: (e: any) => void;
  setSelectRegion: (e: any) => void;
};

const Searchbar = (props: SearchProps) => {
  const handlesubmit = (e: any) => {
    e.preventDefault();
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (props.selectRegion) {
      return navigate(`/region/${props.selectRegion}`);
    }
  }, [props.selectRegion, navigate]);
  const handleSubmitRegion = (e: any) => {
    e.prevebtDefault();
  };

  return (
    <Container>
      <div className="search">
        <form action="" onSubmit={handlesubmit}>
          <div className="search-wrapper">
            <input
              type="text"
              name=""
              id=""
              className="searchControl"
              value={props.searchCountry}
              onChange={(e) => {
                props.setSearchCountry(e.target.value);
              }}
              placeholder="Search Country..."
            />
            <BiSearch
              fontSize={24}
              style={{ marginRight: "12PX", opacity: "0.4" }}
            />
          </div>
        </form>
        <form onSubmit={handleSubmitRegion}>
          <select
            id="select"
            className="select-country"
            value={props.selectRegion}
            onChange={(e) => props.setSelectRegion(e.target.value)}
          >
            <option defaultValue="">Select Region</option>
            <option value="africa">Africa</option>
            <option value="america">America</option>
            <option value="europe">Europe</option>
            <option value="asia">Asia</option>
          </select>
        </form>
      </div>
    </Container>
  );
};

export default Searchbar;
