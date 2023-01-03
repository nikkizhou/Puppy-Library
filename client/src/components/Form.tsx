import React, { useState } from 'react'
import { InputField1 } from './InputField'
import FormDatePicker from './FormDatePicker'
import Swal from 'sweetalert2'

function Form({ addPupppy }: { addPupppy: Function }) {
  const [puppy, setPuppy] = useState({ name: '', bday: 0, breed: '' });
  
  const changeBday=(bday:number)=>setPuppy({...puppy,bday})
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPuppy({ ...puppy, [event.target.name]: event.target.value });
  };
  
  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addPupppy(puppy) 
    Swal.fire({
      icon: 'success',
      title: "Puppy added successfully!",
      text: "Click details on the puppy card to check details"
    });
  }

  return (
    <div className="formContainer">
      <h2>Add Your Own Puppy🐕‍🦺</h2>
      <form onSubmit={submitForm} className="form">
        <InputField1 category="name" onChange={onChange} />
        <InputField1 category="breed" onChange={onChange} />
        <FormDatePicker changeBday={changeBday} />
        <p>Example breeds with image: <br/>whippet, weimaraner, hound, beagle, dhole...</p>
        <button type="submit" className="btn">Add a puppy</button>
      </form>
    </div>
  );
};

export default Form
