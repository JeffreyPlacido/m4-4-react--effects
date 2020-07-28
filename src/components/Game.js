import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Item from "./Item";
import cookieSrc from "../cookie.svg";
import { useState, useEffect } from "react";
import useInterval from "../hooks/use-interval.hook";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const Game = () => {
  const [numCookies, setCookies] = React.useState(10000);
  const [purchasedItems, setPurchasedItems] = React.useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

  useInterval(() => {
    const calculateCookiesPerTick = () => {
      let click = purchasedItems.cursor;
      let avo = purchasedItems.grandma;
      let farm = purchasedItems.farm;
      return click + avo * 10 + farm * 80;
    };

    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);

    setCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  const handleClick = (name, value, cost) => {
    console.log(name, value, cost);
    const updatedItems = purchasedItems;
    updatedItems[name.toLowerCase()] += 1;
    setPurchasedItems(updatedItems);
    if (cost > numCookies) {
      console.log("not enough cookies");
    } else {
      setCookies(numCookies - cost);
    }
  };

  React.useEffect(() => {
    document.title = `${numCookies} cookies - Cookie Clicker Workshop`;

    return () => {
      document.title = `Alati Caserta`;
    };
  }, [numCookies]);
  console.log(numCookies);

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>
            {purchasedItems.cursor +
              purchasedItems.grandma * 10 +
              purchasedItems.farm * 80}
          </strong>{" "}
          cookies per second
        </Indicator>
        <Button onClick={() => setCookies(numCookies + 1)}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item) => {
          return (
            <Item
              key={item.id}
              name={item.name}
              cost={item.cost}
              value={item.value}
              purchasedItems={[purchasedItems, setPurchasedItems]}
              handleClick={handleClick}
              useInterval
            />
          );
        })}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
