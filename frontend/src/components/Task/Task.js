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
const Task = props => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.customer}>
          <FontAwesomeIcon icon={faUser} />
          <h6> {props.task.customer.name}</h6>
        </div>
        <div className={classes.address}>
          <FontAwesomeIcon icon={faLocationDot} />
          <h6>{props.task.addresse.title} </h6>
        </div>
        <div className={classes.date}>
          <FontAwesomeIcon icon={faCalendar} />
          <h6>{props.task.date}</h6>
        </div>
      </div>
      <div className={classes.discription}>
        <div className={classes.lable}>
          <FontAwesomeIcon icon={faAudioDescription} />
          <h6>Discription</h6>
        </div>
        <div className={classes.text}>
          <p>{props.task.discription}</p>
        </div>
      </div>
      <div className={classes.item}>
        <div className={classes.lable}>
          <FontAwesomeIcon icon={faSitemap} /> <h6>Items</h6>
        </div>
        {props.task.item.map(item => {
          return (
            <div key={item.id} className={classes.items}>
              <div className={classes.itemName}>
                <FontAwesomeIcon icon={faFileSignature} />
                <h6>{item.title}</h6>
              </div>
              <div className={classes.sellPrice}>
                <FontAwesomeIcon icon={faArrowRight} />
                <h6>{item.sell_price}</h6>
              </div>
              <div className={classes.buyPrice}>
                <FontAwesomeIcon icon={faArrowRight} />
                <h6>{item.buy_price}</h6>
              </div>
              <div className={classes.profit}>
                <FontAwesomeIcon icon={faWallet} />
                <h6>{item.profit}</h6>
              </div>
            </div>
          );
        })}

        <div className={classes.items}>
          <div className={classes.itemName}>
            <FontAwesomeIcon icon={faFileSignature} />
            <h6>Total</h6>
          </div>
          <div className={classes.sellPrice}>
            <FontAwesomeIcon icon={faArrowRight} />
            <h6>{props.task.total_sell_price}</h6>
          </div>
          <div className={classes.buyPrice}>
            <FontAwesomeIcon icon={faArrowRight} />
            <h6>{props.task.total_buy_price}</h6>
          </div>
          <div className={classes.profit}>
            <FontAwesomeIcon icon={faWallet} />
            <h6>{props.task.total_profit}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
