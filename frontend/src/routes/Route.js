import React, { useState, useEffect } from 'react';
import {Outlet } from 'react-router-dom';
import classes from './Route.module.css';
const Route = props => {
  return (
    <div className={classes.container}>
      <Outlet />
    </div>
  );
};
export default Route;
