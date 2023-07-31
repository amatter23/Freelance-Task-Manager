import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Select from 'react-select';
import classes from './AddTask.module.css';
const AddTask = props => {
  // get customers and addresses from props and convert them to the format that react-select needs
  const [customers, setCustomers] = useState(props.customers);
  // create a list of customers
  const customersList = customers.map(customer => ({
    value: customer.id,
    label: customer.name,
  }));
  // create a list of addresses
  const addressList = customers.flatMap(customer =>
    customer.addresses.map(address => ({
      value: address.id,
      label: address.title,
      filter: customer.id,
    }))
  );
  // states for inputs
  // customer state
  const [customer, setCustomer] = useState(null);
  // address state
  const [address, setAddress] = useState(null);
  // discription state
  const [discription, setDiscription] = useState(null);
  // date state
  const [date, setDate] = useState(null);
  // items state (array of objects)
  const [items, setItems] = useState([
    { title: null, sell_price: null, buy_price: null },
  ]);
  // style for the popup
  const contentStyle = {
    width: '80%',
    background: 'var(--background-color1)',
    overflow: 'auto',
    height: '80%',
  };

  return (
    <div>
      <Popup
        trigger={open => <button className={classes.btn}>Add task</button>}
        modal
        position='center'
        {...{
          contentStyle,
        }}
      >
        {close => (
          <div className={classes.modal}>
            <h5>Add new task</h5>
            <div className={classes.user}>
              <div>
                <h6>Customer</h6>
                <Select
                  value={customer}
                  onChange={selectedOption => {
                    setCustomer(selectedOption);
                    setAddress(null); // Reset the selected address when the customer changes
                  }}
                  options={customersList}
                />
              </div>
              {customer !== null ? (
                <div className={classes.test}>
                  <h6>Address</h6>
                  <Select
                    value={address}
                    onChange={selectedOption => setAddress(selectedOption)}
                    options={addressList.filter(
                      address => address.filter === customer.value
                    )}
                  />
                </div>
              ) : (
                <h6>Choose a customer first to choose an address</h6>
              )}
            </div>
            <div className={classes.discription}>
              <h6>Discription</h6>
              <textarea
                name='discription'
                id='discription'
                cols='30'
                rows='10'
                onChange={e => setDiscription(e.target.value)}
              ></textarea>
            </div>
            <div className={classes.date}>
              <h6>Date</h6>
              <input
                type='date'
                name='date'
                id='date'
                onChange={e => setDate(e.target.value)}
              />
            </div>
            <div className={classes.item}>
              <h6>Items</h6>
              {items.map((item, index) => {
                return (
                  <div className={classes.selectItem} key={index}>
                    <div>
                      <label htmlFor='item'>{`Item ${index + 1}`}</label>
                      <input
                        type='text'
                        name='item'
                        id='item'
                        placeholder={`Item ${index + 1}`}
                        onChange={e => {
                          setItems(prevItems => {
                            const updatedItems = [...prevItems];
                            updatedItems[index] = {
                              ...updatedItems[index],
                              title: e.target.value,
                            };
                            return updatedItems;
                          });
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor='buy_price'>Buy Price</label>
                      <input
                        type='number'
                        name='buy_price'
                        id='buy_price'
                        placeholder='Buy Price'
                        onChange={e => {
                          setItems(prevItems => {
                            const updatedItems = [...prevItems];
                            updatedItems[index] = {
                              ...updatedItems[index],
                              buy_price: e.target.value,
                            };
                            return updatedItems;
                          });
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor='sell_price'>Sell Price</label>
                      <input
                        type='number'
                        name='sell_price'
                        id='sell_price'
                        placeholder='Sell Price'
                        onChange={e => {
                          setItems(prevItems => {
                            const updatedItems = [...prevItems];
                            updatedItems[index] = {
                              ...updatedItems[index],
                              sell_price: e.target.value,
                            };
                            return updatedItems;
                          });
                        }}
                      />
                    </div>
                  </div>
                );
              })}
              <button
                style={{ width: '30%' }}
                type='click'
                className={classes.btn1}
                onClick={e => {
                  e.preventDefault();
                  setItems(current => [
                    ...current,
                    {
                      title: null,
                      sell_price: null,
                      buy_price: null,
                    },
                  ]);
                }}
              >
                Add more Items
              </button>
            </div>
            <div className={classes.done}>
              <button
                className={classes.btn}
                onClick={e => {
                  e.preventDefault();
                  const task = {
                    customer: customer.value,
                    addresse: address.value,
                    discription: discription,
                    date: date,
                    item: items,
                  };
                  props.addTask(task);
                  close();
                }}
              >
                Add Task
              </button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default AddTask;
