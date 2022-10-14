import axios from "axios";
import React, { useEffect, useState } from "react";
import { fetchApi } from "../api/FetchApi";
import Container from "../utils/Container";
import Searchbar from "./Searchbar";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import Error from "./Error";

const CountryRegion = () => {
  const [countries, setCountry] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [selectRegion, setSelectRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const [getError, setError] = useState("");

  const { region } = useParams();
  useEffect(() => {
    const getCountry = async () => {
      setLoading(true);
      try {
        const res = await axios(
          searchCountry
            ? fetchApi(`name/${searchCountry}`)
            : fetchApi(`region/${region}`)
        );
        if (res.data) {
          setLoading(false);
          setCountry(res.data);
        }
      } catch (error: any) {
        setLoading(true);
        setTimeout(() => {
          if (error.response.status === 404) {
            setError(error.request.statusText);
            setLoading(false);
          }
        }, 5000);
      }
    };

    getCountry();
  }, [region, searchCountry]);
  console.log(countries);
  console.log(selectRegion);
  console.log(getError);
  if (getError) {
    return <Error getError={getError} />;
  }
  return (
    <div>
      <Searchbar
        searchCountry={searchCountry}
        setSearchCountry={setSearchCountry}
        selectRegion={selectRegion}
        setSelectRegion={setSelectRegion}
      />

      <Container>
        <>
          <Loader loading={loading} />
          {countries && (
            <div className={`${loading ? "d-none" : "grid"}`}>
              {countries?.slice(0, 8)?.map((country, i) => (
                <ItemList key={i} country={country} />
              ))}
            </div>
          )}
        </>
      </Container>
    </div>
  );
};

export default CountryRegion;
