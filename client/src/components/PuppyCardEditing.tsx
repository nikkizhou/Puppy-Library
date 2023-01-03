import React,{useState} from 'react'
import { Puppy } from '../interfaces'
import { InputField2 } from './InputField'
import Swal from 'sweetalert2'

interface Props {
  puppy: Puppy,
  updatePuppy: Function,
  closeEditing:Function
}

function PuppyCardEditing({ puppy, updatePuppy, closeEditing }: Props) {
  const { name, id, bday, breed } = puppy || {};
  const [newPuppy, setNewPuppy] = useState(puppy);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPuppy({ ...newPuppy, [event.target.name]: event.target.value });
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updatePuppy(id as number, newPuppy);
    Swal.fire({
      icon: 'success',
      title: "Puppy updated successfully!",
      text:"Click details on the puppy card to check the updated image"
    });
  }

  return (
    <div className='puppyCardEditing'>
      <form onSubmit={submitForm} className="form_editing">
      <button className='button_delete' onClick={() => closeEditing()}>X</button>
        <p>PuppyID:  {id}</p>
        <InputField2 category="name" onChange={onChange} value={name} />
        <InputField2 category="breed" onChange={onChange} value={breed} />
        <InputField2 category="bday" onChange={onChange} value={bday} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default PuppyCardEditing
