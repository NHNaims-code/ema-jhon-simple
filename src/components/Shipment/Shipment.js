import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import "./Shipment.css"

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (

    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input className="ship-form-input" name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name"/>
      {errors.name && <span className="error">Name required</span>}
      <input className="ship-form-input" name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email"/>
      {errors.email && <span className="error">Email is required</span>}
      <input className="ship-form-input" name="address" ref={register({ required: true })} placeholder="Your Address"/>
      {errors.address && <span className="error">Address is required</span>}
      <input className="ship-form-input" name="phone" ref={register({ required: true })} placeholder="Your Phone Number"/>
      {errors.phone && <span className="error">This field is required</span>}
      
      
      <input className="ship-form-input" type="submit" />
    </form>
  );
};

export default Shipment;