/* eslint-disable react/prop-types */
// import React from "react";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ScoopOptions from "./ScoopOptions";
import ToppingOptions from "./ToppingOptions";
import Row from "react-bootstrap/Row";
import AlertBanner from "../common/AlertBanner";
// eslint-disable-next-line
import Loading from "../common/Loading";
import { pricePerItem } from "../../constants/index";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, updateItemCount] = useOrderDetails();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        setItems(response.data);
        // setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        // setIsLoading(false);
      });
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOptions : ToppingOptions;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, optionType)
      }
    />
  ));
  // if (isLoading) return <Loading />;
  if (error) return <AlertBanner />;

  return (
    <div>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>{optionItems}</Row>
    </div>
  );
}

export default Options;
