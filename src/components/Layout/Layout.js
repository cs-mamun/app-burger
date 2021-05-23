import React from 'react';
import Auxi from '../../hoc/Auxi';
import StyleClasses from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'


const layout = (props) => (
  <Auxi>
    <Toolbar />
    <main className={StyleClasses.content}>{props.children}</main>
  </Auxi>
);

export default layout;