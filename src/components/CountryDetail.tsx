import React, { useEffect, useState } from "react";
import Container from "../utils/Container";
import "./CountryDetail.css";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { fetchApi } from "../api/FetchApi";
import Loader from "./Loader";
import Error from "./Error";
import Main from "../utils/Main";

const CountryDetail = (props: { darkMode: boolean }) => {
  const { code } = useParams();
  const [countries, setCountries] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [getError, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getCountry = async () => {
      setLoading(true);
      try {
        const res = await axios.get(fetchApi(`alpha/${code}`));
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

  const apiError = countries !== undefined && countries[0] === undefined;
  return (
    <Main darkMode={props.darkMode} bg="detail">
      <Container>
        <>
          <div
            className={`${props.darkMode ? "text-light" : "text-dark"} detail`}
          >
            <button
              className={`${
                props.darkMode ? "text-light bg-input" : "text-dark bg-light"
              } detail-navigate shadow-md`}
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
                    width={350}
                  />
                </div>
                <div className="detail-body-stack">
                  <h1 className="header">{countries[0]?.name?.common}</h1>
                  <div className="detail-body--content">
                    <div className="detail-body--content__left">
                      <h4
                        className={`${
                          props.darkMode ? "text-light" : "text-dark"
                        } h4`}
                      >
                        Population:
                        <span className="span">{countries[0]?.population}</span>
                      </h4>
                      <h4
                        className={`${
                          props.darkMode ? "text-light" : "text-dark"
                        } h4`}
                      >
                        Region:
                        <span className="span"> {countries[0]?.region}</span>
                      </h4>
                      <h4
                        className={`${
                          props.darkMode ? "text-light" : "text-dark"
                        } h4`}
                      >
                        Sub Region:
                        <span className="span">{countries[0]?.subregion}</span>
                      </h4>
                      <h4
                        className={`${
                          props.darkMode ? "text-light" : "text-dark"
                        } h4`}
                      >
                        Capital:
                        <span className="span">{countries[0]?.capital}</span>
                      </h4>
                    </div>
                    <div className="h4-body--content__right">
                      <h4
                        className={`${
                          props.darkMode ? "text-light" : "text-dark"
                        } h4`}
                      >
                        Top Level Domain:
                        <span className="span">{countries[0]?.tld[0]}</span>
                      </h4>
                      <h4
                        className={`${
                          props.darkMode ? "text-light" : "text-dark"
                        } h4`}
                      >
                        Lanquages:
                        <span className="span">
                          {countries[0] &&
                            Object.values(countries[0]?.languages).toString()}
                        </span>
                      </h4>
                    </div>
                  </div>
                  <div className="footer">
                    <h4
                      className={`${
                        props.darkMode ? "text-light" : "text-dark"
                      } h4`}
                    >
                      Border Countries:
                    </h4>
                    <div>
                      {countries[0]?.borders?.map((border: any) => (
                        <span className="span shadow-md footer-text">
                          {capitalize(border)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      </Container>
    </Main>
  );
};

export default CountryDetail;
