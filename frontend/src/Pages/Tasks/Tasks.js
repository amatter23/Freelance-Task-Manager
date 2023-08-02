// import React
import React, { useState } from 'react';
// import css file
import classes from './Tasks.module.css';
// import task component
import Task from '../../components/Task/Task';
// import fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faListCheck,
  faCircleXmark,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api_url } from '../../utils/api';
import axios from 'axios';
import AddTask from '../../components/Task/AddTask';
import AddCustomer from '../../components/customer/AddCustomer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Tasks = props => {
  // query client
  const queryClient = useQueryClient();
  // get tasks from api
  const tasks = useQuery({
    queryKey: ['tasks'],
    queryFn: () => axios(api_url + 'Tasks/').then(res => res.data),
  });

  // get customers from api
  const customers = useQuery({
    queryKey: ['customers'],
    queryFn: () => axios(api_url + 'Customers/').then(res => res.data),
  });
  // states for filter
  // state for type of date (one date or range)
  const [typeDate, setTypeDate] = useState('oneDate');
  const [date, setDate] = useState(null);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  // state for customer
  const [customer, setCustomer] = useState(null);

  // add task mutation
  const addTaskMutation = useMutation({
    mutationFn: newTask => {
      return axios.post(api_url + 'Tasks/', newTask);
    },
    onSuccess: () => {
      toast('Task added successfully', {
        type: 'success',
      });
      queryClient.invalidateQueries('tasks');
    },
    onError: error => {
      toast(error.message, {
        type: 'error',
      });
    },
  });
  // add task function that will be called from AddTask component
  const addTask = data => {
    addTaskMutation.mutate(data);
  };

  // add customer mutation
  const addCustomerMutation = useMutation({
    mutationFn: newCustomer => {
      return axios.post(api_url + 'Customers/', newCustomer);
    },
    onSuccess: () => {
      toast('Task added successfully', {
        type: 'success',
      });
      queryClient.invalidateQueries('customers');
    },
    onError: error => {
      toast(error.message, {
        type: 'error',
      });
    },
  });
  // add customer function that will be called from AddCustomer component
  const addCustomer = data => {
    addCustomerMutation.mutate(data);
  };
  if (tasks.isLoading || customers.isLoading)
    return (
      <div className={classes.empty}>
        <FontAwesomeIcon icon={faSpinner} spin={true} size='2xl' />
      </div>
    );
  if (tasks.isError || customers.isError)
    return (
      <div className={classes.empty}>
        <FontAwesomeIcon color='red' size='2xl' icon={faCircleXmark} />{' '}
        <h4>Something went wrong please try again</h4>
      </div>
    );

  const filteredTasks = tasks.data.filter(task => {
    if (!customer && !date && !from && !to) {
      // Return true for all tasks when both customer and date are null
      return true;
    } else if (customer && !date && !from && !to) {
      // Return true for tasks matching the customer when date is null
      return task.customer.name.includes(customer);
    } else if (!customer && date && !from && !to) {
      // Return true for tasks matching the date when customer is null
      return task.date === date;
    } else if (!customer && !date && from && to) {
      // Return true for tasks within the specified date range when customer is null
      const taskDate = new Date(task.date);
      const fromDate = new Date(from);
      const toDate = new Date(to);
      return taskDate >= fromDate && taskDate <= toDate;
    } else if (customer && date && !from && !to) {
      // Return true for tasks matching both customer and date when both are not null
      return task.customer.name.includes(customer) && task.date === date;
    } else if (customer && !date && from && to) {
      const taskDate = new Date(task.date);
      const fromDate = new Date(from);
      const toDate = new Date(to);
      return (
        task.customer.name.includes(customer) &&
        taskDate >= fromDate &&
        taskDate <= toDate
      );
    }
  });

  const areTasksEmpty = filteredTasks.length === 0;

  return (
    <div className={classes.container}>
      <ToastContainer position='top-right' />
      <div className={classes.header}>
        <div className={classes.title}>
          <FontAwesomeIcon icon={faListCheck} />
          <h4>Tasks</h4>
        </div>
        <div className={classes.filter}>
          <div className={classes.customer}>
            <label htmlFor='customer'>Customer</label>
            <input
              placeholder='Write a customer name'
              type='text'
              id='customer'
              onChange={e => {
                setCustomer(e.target.value);
              }}
            />
          </div>
          <div className={classes.date}>
            <div className={classes.tpggle}>
              <button
                onClick={() => {
                  setTypeDate('oneDate');
                  setFrom(null);
                  setTo(null);
                }}
                className={`${classes.button} ${
                  typeDate === 'oneDate' ? classes.active : ''
                }`}
              >
                One Date
              </button>
              <button
                onClick={() => {
                  setTypeDate('twoDates');
                  setDate(null);
                }}
                className={`${classes.button} ${
                  typeDate === 'twoDates' ? classes.active : ''
                }`}
              >
                Between two dates
              </button>
            </div>
            <div
              className={classes.oneDate}
              style={{
                display: typeDate === 'oneDate' ? 'flex' : 'none',
              }}
            >
              <label htmlFor='date'>Date</label>
              <input
                type='date'
                id='date'
                onChange={e => {
                  setDate(e.target.value);
                }}
              />
            </div>
            <div
              style={{
                display: typeDate === 'twoDates' ? 'flex' : 'none',
              }}
              className={classes.twoDates}
            >
              <label htmlFor='from'>From</label>
              <input
                type='date'
                id='from'
                onChange={e => {
                  setFrom(e.target.value);
                }}
              />
              <label htmlFor='to'>To</label>
              <input
                type='date'
                id='to'
                onChange={e => {
                  setTo(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className={classes.addTask}></div>
        <AddTask customers={customers.data} addTask={addTask} />
        <AddCustomer addCustomer={addCustomer} />
      </div>
      <div className={classes.tasks}>
        {areTasksEmpty ? (
          <div className={classes.empty}>
            <FontAwesomeIcon color='red' size='2xl' icon={faCircleXmark} />{' '}
            <h6>No tasks available</h6>
          </div>
        ) : (
          filteredTasks.map(task => <Task key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
};

export default Tasks;
