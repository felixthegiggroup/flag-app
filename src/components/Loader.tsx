import React from "react";
import spanner from "../images/spinner.gif";

type LoaderProps = {
  loading: boolean;
};
const Loader = (props: LoaderProps) => {
  return (
    <div className={`${props.loading && "error-style"}`}>
      {props.loading && (
        <div className="spinner">
          <img src={spanner} alt="spinner" />
          <h1>Loading</h1>
        </div>
      )}
    </div>
  );
};

export default Loader;
