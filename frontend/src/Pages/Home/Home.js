// creata a react component
import React from 'react';
// import css file
import classes from './Home.module.css';
// import fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
// import task component
import Task from '../../components/Task/Task';
// react component
function Home() {
  return (
    <div className={classes.home}>
      {/* <div className={classes.left}>
        <h5>Last 3 days tasks</h5>
      </div>
      <div className={classes.right}>
        <div className={classes.top}></div>
        <div className={classes.bottom}>
          <FontAwesomeIcon icon={faHouse} />
        </div>
      </div> */}
      <Task />
    </div>
  );
}

export default Home;
