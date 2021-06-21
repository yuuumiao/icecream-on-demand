/* eslint-disable react/prop-types */
// import React from "react";
import React, { Component } from "react";
//import { useEffect, useState } from "react";
import axios from "axios";
import ScoopOptions from "./ScoopOptions";
import ToppingOptions from "./ToppingOptions";
import Row from "react-bootstrap/Row";
import AlertBanner from "../common/AlertBanner";

class Options extends Component {
  state = {
    items: [],
    error: false,
    isLoading: true,
  };

  componentDidMount() {
    axios
      .get(`http://localhost:3030/${this.props.optionType}`)
      .then((res) => this.setState({ items: res.data, isLoading: false }))
      .catch(() => this.setState({ error: true }));
  }

  render() {
    if (this.state.isLoading) return <div>Loading</div>;
    else if (this.state.error) return <AlertBanner />;
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
