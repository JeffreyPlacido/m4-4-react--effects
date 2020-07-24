import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";

const PurchaseButton = styled.button`
height: 80px;
width: 200px;
`
const Item = (props) => {
    const getQuant= props.name.toLowerCase()
    return (
        <PurchaseButton onClick={() => props.handleClick()}>
    <p>{props.name}</p>
    <p>{props.value}</p>
    <p>{props.cost}</p>
    <p>{props.purchasedItems[getQuant]}</p>
        </PurchaseButton>
    )
}

export default Item;

