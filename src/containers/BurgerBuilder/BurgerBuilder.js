import React, { Component } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummery from "../../components/Burger/OrderSummery/OrderSumery";
import Modal from "../../components/UI/Modal/Modal";
import Auxi from "../../hoc/Auxi/Auxi";
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";


import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.3,
  meat: 2,
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
  };

  componentDidMount(){
    axios.get("https://cs-burger-app-default-rtdb.firebaseio.com/ingredients.json").then(res => {
      this.setState({ingredients: res.data})
    });
  }

  updatePurchaseState(ingredients) {
    // const ingredients = {...this.state.ingredients};
    const sum = Object.keys(ingredients)
      .map((igkey) => {
        return ingredients[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchaseable: sum > 0 });
  }
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updateCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updateCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    if (oldCount <= 0) {
      return;
    }
    const updateCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updateCount;

    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // alert("You continue!");
    this.setState({loading: true});
    const order = {
      ingredients: this.state.ingredients,
      customer: {
        name: "Mamun",
        address: {
          street: "320/1, virus street",
          zipcode: "0013",
          country: "Bangladesh",
        },
        email: "dr.mamun@gmail.com",
      },
      deliveryMethod: "fastExpress",
    };

    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({loading: false, purchasing: false,});
      })
      .catch((err) => {
        this.setState({ loading: false, purchasing: false, });
      });
  };

  render() {
    const disableInfo = { ...this.state.ingredients };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummery = null;
        
          
    let burger = <Spinner/>
    if (this.state.ingredients) {
      burger = (
        <Auxi>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemove={this.removeIngredientHandler}
            disabled={disableInfo}
            purchaseable={this.state.purchaseable}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
          />
        </Auxi>
        
      );
      orderSummery = (
        <OrderSummery
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
        />
      );
      if(this.state.loading){
            orderSummery = <Spinner/>;
          };
    }
    

    return (
      <Auxi>
        <Modal
          show={this.state.purchasing}
          moduleClosed={this.purchaseCancelHandler}
        >
          {orderSummery}
        </Modal>
        {burger}
      </Auxi>
    );
  }
}

export default BurgerBuilder;
