import React, { Component } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import Auxi from "../../hoc/Auxi";
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      bacon: 0,
      meat: 0,
    },
  };
  render() {
    return (
      <Auxi>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls/>
      </Auxi>
    );
  }
}

export default BurgerBuilder;
