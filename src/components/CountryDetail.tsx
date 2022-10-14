import React, { useEffect, useState } from "react";
import Container from "../utils/Container";
import "./CountryDetail.css";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { fetchApi } from "../api/FetchApi";
import Loader from "./Loader";
import Error from "./Error";

const CountryDetail = () => {
  const { code } = useParams();
  const [countries, setCountries] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [getError, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getCountry = async () => {
      setLoading(true);
      try {
        const res = await axios.get(fetchApi(`alphas/${code}`));
        if (res.data) {
          setCountries(res.data);
          setLoading(false);
        }
      } catch (error: any) {
        setLoading(true);
        setTimeout(() => {
          if (error.response.status === 404) {
            setError(error.request.statusText);
          }
          setLoading(false);
        }, 5000);
      }
    };

    getCountry();
  }, [code]);

  let result;
  for (let x in countries) {
    result = countries[x];
  }

  function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <Container>
      <>
        <div className="detail">
          <button
            className="detail-navigate shadow-md"
            onClick={() => navigate("/")}
          >
            <BsArrowLeft className="icon" /> Back
          </button>
          <Loader loading={loading} />
          {result ? (
            <div className="detail-body">
              <div className="detail-body--img">
                <img src={result.flags.png} alt={result?.name?.common} />
              </div>
              <div className="detail-body-stack">
                <h1 className="header">{result?.name?.common}</h1>
                <div className="detail-body--content">
                  <div className="detail-body--content__left">
                    <h4 className="h4">
                      Population:{" "}
                      <span className="span">{result?.population}</span>
                    </h4>
                    <h4 className="h4">
                      Region: <span className="span"> {result?.region}</span>
                    </h4>
                    <h4 className="h4">
                      Sub Region:{" "}
                      <span className="span">{result?.subregion}</span>
                    </h4>
                    <h4 className="h4">
                      {" "}
                      Capital: <span className="span">{result?.capital}</span>
                    </h4>
                  </div>
                  <div className="detail-body--content__right">
                    <h4 className="h4">
                      {" "}
                      Top Level Domain:{" "}
                      <span className="span">{result?.tld[0]}</span>
                    </h4>
                    <h4 className="h4">
                      Lanquages:{" "}
                      <span className="span">
                        {Object.values(result?.languages).toString()}
                      </span>
                    </h4>
                  </div>
                </div>
                <div className="footer">
                  <h4 className="h4">
                    Border Countries:
                    {result?.borders?.map((border: any) => (
                      <span className="span shadow-md footer-text">
                        {" "}
                        {capitalize(border)}
                      </span>
                    ))}
                  </h4>
                </div>
              </div>
            </div>
          ) : (
            <Error getError={getError} />
          )}
        </div>
      </>
    </Container>
  );
};

export default CountryDetail;
