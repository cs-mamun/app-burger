import React, { Component } from "react";
import Auxi from "../Auxi/Auxi";
import StyleClasses from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    sideDrawer: false,
  };
  sideDrawerCloseHandler = () => {
    this.setState({ sideDrawer: false });
  };
  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { sideDrawer: !prevState.sideDrawer };
    });
  };
  render() {
    return (
      <Auxi>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
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
