import React,{useState} from 'react'
import { Puppy } from '../interfaces'
import {InputField2} from './InputField'

interface Props {
  puppy: Puppy,
  changeEditedPuppyId: Function,
  renderEditedPuppy: Function
}

function PuppyCardEditing({ puppy, changeEditedPuppyId, renderEditedPuppy }: Props) {
  const { name, id, bday, breed } = puppy;
  const [newPuppy, setNewPuppy] = useState(puppy);

  const updatePuppy = async () => {
    console.log(newPuppy.name, 'newPuppy in updatePuppy');
    
    fetch(`/api/puppies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name:newPuppy.name,bday:newPuppy.bday,bree:newPuppy.breed})
    }).catch(err => console.log(err))
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPuppy({ ...newPuppy, [event.target.name]: event.target.value });
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updatePuppy();
    renderEditedPuppy(id, newPuppy);
    alert("Puppy updated successfully!");
  }

  return (
    <div className='puppyCardEditing'>
      <div className='puppyCardEditing_block'>
        <form onSubmit={submitForm} className="form_editing">
          <p>Id:  {id}</p>
          <InputField2 category="name" onChange={onChange} value={name} />
          <InputField2 category="breed" onChange={onChange} value={breed} />
          <InputField2 category="bday" onChange={onChange} value={bday} />
          <div className='form_editing_btnContainer'>
            <button type="submit">Submit</button>
            <button onClick={() => changeEditedPuppyId(null)}>X</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PuppyCardEditing
