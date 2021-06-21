import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
//useMemo is to preventing page refrashing too fast
import { pricePerItem } from "../constants/index";

const OrderDetails = createContext();

//create a custom hooker

const useOrderDetails = () => {
  const context = useContext(OrderDetails);
  if (!context) {
    throw new Error("useOrderDetails must used within an OrderDetailProvider");
  }

  return context;
};

const calculateSubtotal = (optionType, optionCounts) => {
  let optionCount = 0;
  for (const count of optionCounts[optionType].value()) {
    //it will iterate the value
    optionCount += count;
  }
  return optionCount * pricePerItem[optionType];
};

const OrderDetailsProvider = (props) => {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });
  //Map() is like Object, but easier to iterate

  const [totals, setTotals] = useState({
    scoops: 0,
    toppings: 0,
    grandTotal: 0,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
    const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      scoops: scoopsSubtotal,
      toppings: toppingsSubtotal,
      grandTotal: grandTotal,
    });
  }, [optionCounts]);

  const updatedValue = useMemo(() => {
    const updateItemsCount = (itemName, newItemCount, optionType) => {
      const newOptionCounts = { ...optionCounts };
      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));
      setOptionCounts(newOptionCounts);
    };

    //getter: object containing option counts for scoops and toppings, subtatals and totals
    //setter: updateOptionCount
    return [{ ...optionCounts, totals }, updateItemsCount];
  }, [optionCounts, totals]); //like userEffect, it needs to know when to change

  return <OrderDetails.Provider value={updatedValue} {...props} />;
};

export { OrderDetailsProvider, useOrderDetails };
