import React,{useState} from 'react';
import { Puppy } from '../interfaces';
import PuppyCardDetail from './PuppyCardDetail';

interface Props{
  puppy: Puppy,
  changePuppyId: Function,
  renderDeletePuppy:Function
}

function PuppyCard({ puppy, changePuppyId, renderDeletePuppy }: Props) {
  const { name, id} = puppy

  const deleteOnePuppy = async (id:number) => {
    fetch(`/api/puppies/${id}`, {method: 'DELETE'})
      .catch(err => console.log(err))
    
    renderDeletePuppy(id);
  }


  return (
    <div className='puppyCard'>
      <div className='puppyCard_desc'>
        <p>Id: {id}</p>
        <p>Name: {name}</p>
      </div>
      <div className='puppyCard_buttons'>
        <button onClick={() => deleteOnePuppy(id)}>Delete</button>
        <button>Edit</button>
        <button onClick={() => changePuppyId(id)}>Details</button>
      </div>
    </div>
  );
}

export default PuppyCard
