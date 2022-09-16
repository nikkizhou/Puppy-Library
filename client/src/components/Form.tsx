import React, { useState } from 'react'
import { Puppy } from '../interfaces';
import { InputField1 } from './InputField'
import FormDatePicker from './FormDatePicker'

interface Props{
  renderNewPuppy: Function
}

function Form({renderNewPuppy}:Props) {
  const [puppy, setPuppy] = useState({name:'', bday:0, breed:''});

  const addOnePuppy = async () => {
    fetch('/api/puppies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(puppy)
    })
      .then(res => res.json())
      .then(newPuppy => renderNewPuppy(newPuppy))
      .catch(err => console.log(err))
  }

  const changeBday=(bday:number)=>setPuppy({...puppy,bday})

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPuppy({ ...puppy, [event.target.name]: event.target.value });
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addOnePuppy() 
  }

  return (
    <div className="formContainer">
      <h2>Add Your Own Puppy🐕‍🦺</h2>
      <form onSubmit={submitForm} className="form">
        <InputField1 category="name" onChange={onChange} />
        <InputField1 category="breed" onChange={onChange} />
        <FormDatePicker changeBday={changeBday } />
        <button type="submit" className="btn">Add a puppy</button>
      </form>
    </div>
  );
};

export default Form
