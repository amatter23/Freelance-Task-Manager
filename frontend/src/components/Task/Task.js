import react, { useState } from 'react';
import classes from './Task.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faCalendar,
  faLocationDot,
  faAudioDescription,
  faSitemap,
  faFileSignature,
  faArrowRight,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
const Task = () => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.customer}>
          <FontAwesomeIcon icon={faUser} />
          <h6>Ahmed matter</h6>
        </div>
        <div className={classes.address}>
          <FontAwesomeIcon icon={faLocationDot} /> <h6>64 rashad fkljsdaf </h6>
        </div>
        <div className={classes.date}>
          <FontAwesomeIcon icon={faCalendar} />
          <h6>26/8/2001</h6>
        </div>
      </div>
      <div className={classes.discription}>
        <div className={classes.lable}>
          <FontAwesomeIcon icon={faAudioDescription} />
          <h6>Discription</h6>
        </div>
        <div className={classes.text}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptatum, quibusdam, quia, quos voluptates voluptate quod
            voluptatibus quas doloribus quidem voluptatem. Quisquam voluptatum,
            quibusdam, quia, quos voluptates voluptate quod voluptatibus quas
            doloribus quidem voluptatem.
          </p>
        </div>
      </div>
      <div className={classes.item}>
        <div className={classes.lable}>
          <FontAwesomeIcon icon={faSitemap} /> <h6>Items</h6>
        </div>
        <div className={classes.items}>
          <div className={classes.itemName}>
            <FontAwesomeIcon icon={faFileSignature} />
            <h6>رسيفر</h6>
          </div>
          <div className={classes.sellPrice}>
            <FontAwesomeIcon icon={faArrowRight} />
            <h6>600</h6>
          </div>
          <div className={classes.buyPrice}>
            <FontAwesomeIcon icon={faArrowRight} />
            <h6>500</h6>
          </div>
          <div className={classes.profit}>
            <FontAwesomeIcon icon={faWallet} />
            <h6>100</h6>
          </div>
        </div>
        <div className={classes.items}>
          <div className={classes.itemName}>
            <FontAwesomeIcon icon={faFileSignature} />
            <h6>Total</h6>
          </div>
          <div className={classes.sellPrice}>
            <FontAwesomeIcon icon={faArrowRight} />
            <h6>600</h6>
          </div>
          <div className={classes.buyPrice}>
            <FontAwesomeIcon icon={faArrowRight} />
            <h6>500</h6>
          </div>
          <div className={classes.profit}>
            <FontAwesomeIcon icon={faWallet} />
            <h6>100</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
