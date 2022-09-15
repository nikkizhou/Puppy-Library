import React, { useState } from 'react'
import { Puppy } from '../interfaces';

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

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPuppy({ ...puppy, [event.target.name]: event.target.value });
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addOnePuppy() 
  }

  return (
    <div className="formContainer">
      <h2>Add Your Own Puppy</h2>
      <form onSubmit={submitForm} className="form">
        <input
          onChange={onChange}
          type="text"
          placeholder="name:"
          name="name"
          required
        />
        <input
          onChange={onChange}
          type="text"
          placeholder="breed:"
          name="breed"
          required
        />
        <input
          onChange={onChange}
          type="number"
          placeholder="birthday:"
          name="bday"
          required
        />
        <button type="submit" className="btn">Add a dog</button>
      </form>
    </div>
  );
};

export default Form
