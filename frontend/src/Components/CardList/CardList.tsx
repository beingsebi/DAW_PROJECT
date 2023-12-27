import React from "react";
import Card from "../Card/Card";

type Props = {};

const CardList: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <div>
      <Card companyName="Apple" ticker="AAPL" price={100}></Card>
      <Card companyName="Apple2" ticker="AAP2L" price={102}></Card>
      <Card companyName="Apple3" ticker="AAPL3" price={133}></Card>
    </div>
  );
};

export default CardList;
