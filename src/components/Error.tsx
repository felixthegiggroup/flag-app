import React from "react";
type ErrorProps = {
  getError: string;
};
const Error = (props: ErrorProps) => {
  return (
    <div className={`${props.getError && "error-style error"}`}>
      {props.getError && (
        <div className="error">
          <img
            src="https://www.pngkey.com/png/detail/52-520194_error-404-page-was-not-found-news-http.png"
            alt="Error 404 Page Was Not Found News Http Htm - Error 404 Png@pngkey.com"
          ></img>
        </div>
      )}
    </div>
  );
};

export default Error;
