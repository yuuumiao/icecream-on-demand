// import React from "react";
import React, { Component } from "react";

//import { useEffect, useState } from "react";
import axios from "axios";
import ScoopOptions from "./ScoopOptions";
import ToppingOptions from "./ToppingOptions";
import Row from "react-bootstrap/Row";
import AlertBanner from "../common/AletrBanner";

// function Options({ optionType }) {
//   const [items, setItems] = useState([]);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3030/${optionType}`)
//       .then((response) => setItems(response.data))
//       .catch((err) => setError(true));
//   }, [optionType]);

//   const ItemComponent = optionType === "scoops" ? ScoopOptions : ToppingOptions;

//   const optionItems = items.map((item) => (
//     <ItemComponent
//       key={item.name}
//       name={item.name}
//       imagePath={item.imagePath}
//     />
//   ));

//   return <Row>{optionItems}</Row>;
// }

// export default Options;

class Options extends Component {
  state = {
    items: "",
    error: false,
  };
  ComponentDidMount() {
    axios
      .get(`http://localhost:3030/${this.props.optionType}`)
      .then((res) => this.setState({ items: res.data }))
      .catch((error) => this.setState({ error: true }));
    console.log("here>>>>", this.state.items);
  }

  render() {
    if (this.state.error) return <AlertBanner />;

    return (
      <div className="Options">
        {this.props.optionType === "scoops" ? (
          <Row>
            {this.state.items.map((i) => (
              <ScoopOptions
                key={i.name}
                name={i.name}
                imagePath={i.imagePath}
              />
            ))}
          </Row>
        ) : null}
        {this.props.optionType === "toppings" ? (
          <Row>
            {this.state.items.map((i) => (
              <ToppingOptions
                key={i.name}
                name={i.name}
                imagePath={i.imagePath}
              />
            ))}
          </Row>
        ) : null}
      </div>
    );
  }
}

export default Options;
