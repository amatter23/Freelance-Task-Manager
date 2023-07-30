// import React
import React, { useState } from 'react';
// import css file
import classes from './Tasks.module.css';
// import task component
import Task from '../../components/Task/Task';
// import fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { useGetTasks } from '../../hooks/query/query';
import { useQuery } from '@tanstack/react-query';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  // const { data } = useGetTasks();
  const { data } = useQuery({
    queryKey: ['tasks'],
    queryFn: () =>
      fetch('https://127.0.0.1:8000/Customers/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => res.json()),
  });
  console.log(data);
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.title}>
          <FontAwesomeIcon icon={faListCheck} />
          <h5>Tasks</h5>
        </div>
        <div className={classes.filter}>
          <div className={classes.customer}>
            <label htmlFor='customer'>Customer</label>
            <input type='text' id='customer' />
          </div>
          <div className={classes.date}>
            <div className={classes.tpggle}>
              <button className={classes.dateType}>One Date</button>
              <button className={classes.dateType}>Between two dates</button>
            </div>
            <div className={classes.oneDate}>
              <label htmlFor='date'>Date</label>
              <input type='date' id='date' />
            </div>
            <div className={classes.twoDates}>
              <label htmlFor='from'>From</label>
              <input type='date' id='from' />
              <label htmlFor='to'>To</label>
              <input type='date' id='to' />
            </div>
          </div>
        </div>
      </div>
      <div className={classes.tasks}>
        {tasks.map(task => {
          return <Task task={task} />;
        })}
      </div>
    </div>
  );
};

export default Tasks;
