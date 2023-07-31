import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import classes from './AddCustomer.module.css';
const AddCustomer = props => {
  // states for inputs
  // name state
  const [name, SetName] = useState(null);
  // phone state
  const [phone, SetPhone] = useState(null);
  // address state
  const [address, setAddress] = useState([{ title: null, address: null }]);
  // style for the popup
  const contentStyle = {
    width: '80%',
    background: 'var(--background-color1)',
    overflow: 'auto',
    height: 'fit-content',
  };
  return (
    <div>
      <Popup
        trigger={open => <button className={classes.btn}>Add customer</button>}
        modal
        {...{
          contentStyle,
        }}
      >
        {close => (
          <div className={classes.modal}>
            <h5>Add new customer</h5>
            <h6>Name</h6>
            <input
              type='text'
              name='name'
              id='name'
              placeholder='Name'
              onChange={e => SetName(e.target.value)}
            />

            <h6>Phone</h6>
            <input
              type='number'
              name='phone'
              id='phone'
              placeholder='Phone'
              onChange={e => SetPhone(e.target.value)}
            />
            <div className={classes.addresses}>
              <h6>Address</h6>
              {address.map((item, index) => {
                return (
                  <div className={classes.address} key={index}>
                    <div>
                      <label htmlFor='item'>{`Title ${index + 1}`}</label>
                      <input
                        type='text'
                        name='item'
                        id='item'
                        placeholder={`Title ${index + 1}`}
                        onChange={e => {
                          setAddress(prevItems => {
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
                      <label htmlFor='sell_price'>Address</label>
                      <input
                        type='text'
                        name='sell_price'
                        id='sell_price'
                        placeholder='Address'
                        onChange={e => {
                          setAddress(prevItems => {
                            const updatedItems = [...prevItems];
                            updatedItems[index] = {
                              ...updatedItems[index],
                              address: e.target.value,
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
                className={classes.btn}
                onClick={e => {
                  e.preventDefault();
                  setAddress(current => [
                    ...current,
                    {
                      title: null,
                      address: null,
                    },
                  ]);
                }}
              >
                Add more Address
              </button>
            </div>
            <div className={classes.done}>
              <button
                className={classes.btn1}
                onClick={e => {
                  e.preventDefault();
                  const customer = {
                    name: name,
                    phone: phone,
                    addresses: address,
                  };
                  props.addCustomer(customer);
                  close();
                }}
              >
                Add Customer
              </button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default AddCustomer;
