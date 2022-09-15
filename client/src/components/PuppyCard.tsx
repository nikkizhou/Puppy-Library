import React,{useState} from 'react';
import { Puppy } from '../interfaces';
import PuppyCardDetail from './PuppyCardDetail';

interface Props{
  puppy: Puppy,
  changePuppyId: Function
}

function PuppyCard({ puppy, changePuppyId }:Props) {
  const { name, id, bday, breed } = puppy
  const [showDetail, setShowDetail] = useState(false);

  console.log("id in PuppyCard ",id);
  console.log("puppy in PuppyCard ", puppy);
  

  const deleteOnePuppy = async (id:number) => {
    fetch(`/api/puppies/${id}`, {method: 'DELETE'})
      .catch(err => console.log(err))
    alert('The puppy is deleted from library, refresh to see update!')
  }

  
  return (
    <>
    <div className='puppyCard'>
      <div className='puppyCard_details'>
        <p>Id: {id}</p>
        <p>Name: {name}</p>
      </div>
      <div className='puppyCard_buttons'>
        <button onClick={()=>deleteOnePuppy(id)}>Delete</button>
        <button>Edit</button>
          <button onClick={() => changePuppyId(id)}>Details</button>
      </div>
    </div>
    

  </>
  );
}

export default PuppyCard
