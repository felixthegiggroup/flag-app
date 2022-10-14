import React from "react";
type ContactProp = {
  children: JSX.Element;
};
const Container = (props: ContactProp) => {
  return <div className="container">{props.children}</div>;
};

export default Container;
