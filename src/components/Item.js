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
    const getQuants = props.purchasedItems[0][getQuant];
    return (
        <PurchaseButton onClick={() =>  props.handleClick(props.name, props.value, props.cost)}>
    <p>{props.name}</p>
    <p>{props.value}</p>
    <p>{props.cost}</p>
    <p>{getQuants}</p>
        </PurchaseButton>
    )
}

export default Item;

