import React from "react";
import Auxi from "../../../hoc/Auxi/Auxi";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.css";


const modal = (props) => (
  <Auxi>
      <Backdrop show={props.show} clicked={props.moduleClosed}/>
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0",
      }}
    >
      {props.children}
    </div>
  </Auxi>
);

export default modal;
