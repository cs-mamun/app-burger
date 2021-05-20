import React from "react";
import Classes from './Burger.module.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
    let transformIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])]
        .map((_,i) => {
            return <BurgerIngredient key={igKey + i} type={igKey}/>
        })
        .reduce((arr,el) => {
            return arr.concat(el);
        },[]);
    });
    if(transformIngredients.length === 0) {
        transformIngredients = <p>Please start adding ingredients!</p>
    }
    console.log(transformIngredients);
    return (
      <div className={Classes.Burger}>
        <BurgerIngredient type="bread-top" />
        {transformIngredients}
        <BurgerIngredient type="bread-bottom" />
      </div>
    );
}

export default burger;