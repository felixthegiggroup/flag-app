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

  const capitalize = (border: string) => {
    return border.charAt(0).toUpperCase() + border.slice(1).toLowerCase();
  };
  console.log(countries[0]);

  const apiError = countries !== undefined && countries[0] === undefined;
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
          {apiError ? (
            <Error getError={getError} />
          ) : (
            <div className={`${getError ? "d-none" : ""} detail-body`}>
              <div className="detail-body--img">
                <img
                  src={countries[0]?.flags?.png}
                  alt={countries[0]?.name?.common}
                />
              </div>
              <div className="detail-body-stack">
                <h1 className="header">{countries[0]?.name?.common}</h1>
                <div className="detail-body--content">
                  <div className="detail-body--content__left">
                    <h4 className="h4">
                      Population:
                      <span className="span">{countries[0]?.population}</span>
                    </h4>
                    <h4 className="h4">
                      Region:
                      <span className="span"> {countries[0]?.region}</span>
                    </h4>
                    <h4 className="h4">
                      Sub Region:
                      <span className="span">{countries[0]?.subregion}</span>
                    </h4>
                    <h4 className="h4">
                      Capital:
                      <span className="span">{countries[0]?.capital}</span>
                    </h4>
                  </div>
                  <div className="detail-body--content__right">
                    <h4 className="h4">
                      Top Level Domain:
                      <span className="span">{countries[0]?.tld[0]}</span>
                    </h4>
                    <h4 className="h4">
                      Lanquages:
                      <span className="span">
                        {countries[0] &&
                          Object.values(countries[0]?.languages).toString()}
                      </span>
                    </h4>
                  </div>
                </div>
                <div className="footer">
                  <h4 className="h4">
                    Border Countries:
                    {countries[0]?.borders?.map((border: any) => (
                      <span className="span shadow-md footer-text">
                        {capitalize(border)}
                      </span>
                    ))}
                  </h4>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    </Container>
  );
};

export default CountryDetail;
