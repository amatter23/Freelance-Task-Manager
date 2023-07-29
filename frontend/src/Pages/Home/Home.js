// creata a react component
import React from 'react';
// import css file
import classes from './Home.module.css';
// react component
function Home() {
  return (
    <div className={classes.Home}>
      <h1>Home</h1>
      <p>Home page</p>
    </div>
  );
}

export default Home;
