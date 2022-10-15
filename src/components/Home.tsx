import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { fetchApi } from "../api/FetchApi";
import Container from "../utils/Container";
import Searchbar from "./Searchbar";
import ItemList from "./ItemList";
import Loader from "./Loader";
import Error from "./Error";
import Main from "../utils/Main";

const Home = (props: { darkMode: boolean }) => {
  console.log("hello", props.darkMode);
  const [countries, setCountry] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [selectRegion, setSelectRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const [getError, setError] = useState("");

  useEffect(() => {
    const getCountry = async () => {
      setLoading(true);

      try {
        const res = await axios(
          searchCountry ? fetchApi(`name/${searchCountry}`) : fetchApi(`/all`)
        );

        if (res.data) {
          setCountry(res.data);
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
  }, [searchCountry]);

  return (
    <>
      <Main darkMode={props.darkMode} bg="home">
        <div>
          <Searchbar
            searchCountry={searchCountry}
            setSearchCountry={setSearchCountry}
            selectRegion={selectRegion}
            setSelectRegion={setSelectRegion}
            darkMode={props.darkMode}
          />
          <Container>
            <Fragment>
              {loading && <Loader loading={loading} />}
              {countries && (
                <div className="grid">
                  {countries?.slice(0, 8)?.map((country, i) => (
                    <ItemList key={i} country={country} dark={props.darkMode} />
                  ))}
                </div>
              )}

              {getError && <Error getError={getError} />}
            </Fragment>
          </Container>
        </div>
      </Main>
    </>
  );
};

export default Home;
