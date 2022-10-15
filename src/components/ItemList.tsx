import React from "react";
import { Link } from "react-router-dom";

type ItemListProps = {
  country: {
    capital: string[];
    name: {
      common: string;
    };
    population: number;
    region: string;
    flags: { png: string };
    ccn3: string;
  };
  dark?: boolean;
};

const ItemList = (props: ItemListProps) => {
  // console.log("first", props.dark);
  return (
    <div
      className={`${
        props.dark ? "text-light" : "bg-light text-dark"
      } item shadow-md`}
    >
      <Link
        to={`/country/${props.country.ccn3}`}
        style={{ textDecoration: "none" }}
        className={`${props.dark ? "text-light" : "text-dark"}`}
      >
        <div className="img-wrapper">
          <img
            src={props.country.flags.png}
            alt=""
            className="item-img"
            height={200}
          />
        </div>
        <div className="item-body">
          <h1
            className={`${
              props.dark ? "text-light" : "text-dark"
            }item-body--heading`}
          >
            {props.country.name.common}
          </h1>
          <h4 className="item-body--text">
            Population: {props.country.population}
          </h4>
          <h4 className="item-body--text">Region: {props.country.region}</h4>
          <h4 className="item-body--text">Capital: {props.country.capital}</h4>
        </div>
      </Link>
    </div>
  );
};

export default ItemList;
