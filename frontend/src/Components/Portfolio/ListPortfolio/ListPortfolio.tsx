import React from "react";
import CardPortfolio from "../CardPortfolio/CardPortfolio";

interface Props {
  portfolioValues: string[];
}

const ListPortfolio = ({ portfolioValues }: Props) => {
  return (
    <>
      <h3>My Portfolio</h3>
      {portfolioValues &&
        portfolioValues.map((value) => {
          return <CardPortfolio portfolioValue={value}></CardPortfolio>;
        })}
    </>
  );
};

export default ListPortfolio;
