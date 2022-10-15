import React from "react";

const Main = (props: {
  children?: JSX.Element | undefined;
  darkMode: boolean | undefined;
  bg: string;
}) => {
  return (
    <main className={`${props.darkMode ? "bg-dark " : "bg-light"} ${props.bg}`}>
      {props.children}
    </main>
  );
};

export default Main;
