import React, { Component } from "react";
import Auxi from "../../hoc/Auxi";
import StyleClasses from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    sideDrawer: true,
  };
  sideDrawerCloseHandler = () => {
    this.setState({ sideDrawer: false });
  };
  render() {
    return (
      <Auxi>
        <Toolbar />
        <SideDrawer
          open={this.state.sideDrawer}
          closed={this.sideDrawerCloseHandler}
        />
        <main className={StyleClasses.content}>{this.props.children}</main>
      </Auxi>
    );
  }
}

export default Layout;
