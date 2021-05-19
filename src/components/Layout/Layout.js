import React from 'react';
import Auxi from '../../hoc/Auxi';
import StyleClasses from './Layout.module.css'


const layout = (props) => (
  <Auxi>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={StyleClasses.content}>{props.children}</main>
  </Auxi>
);

export default layout;