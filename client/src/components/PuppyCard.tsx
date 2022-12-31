import React,{useState, useEffect} from 'react';
import { Puppy } from '../interfaces';
import PuppyCardDetail from './PuppyCardDetail';
import PuppyCardEditing from '../components/PuppyCardEditing';


interface Props{
  puppy: Puppy,
  deletePuppy: Function,
  updatePuppy: Function
}

function PuppyCard({ puppy, deletePuppy, updatePuppy }: Props) {
  const { name, id} = puppy ||{}
  const [isEditing, setIsEditing] = useState<boolean>();
  const [showDetails, setShowDetails] = useState<boolean>();

  return (
    <>
      {(isEditing || showDetails) && <div className='coverLayer'></div>}
      
      {isEditing && <PuppyCardEditing
        puppy={puppy}
        updatePuppy={updatePuppy}
        closeEditing={() => setIsEditing(false)}
      />}

      {showDetails && <PuppyCardDetail
        puppy={puppy}
        closeDetails={() => setShowDetails(false)}
      />}

      <div className='puppyCard'>
      <button
        className='button_delete'
          onClick={() => deletePuppy(id as number)}>
        <i className='fa fa-trash'/>
      </button>
      <div className='puppyCard_desc'>
          <p>PuppyID: {id}</p>
        <p>Name: {name}</p>
      </div>
      <div className='puppyCard_buttons'>
        <button
          onClick={() => setIsEditing(true)}>
          <i className='fa fa-edit' />  Edit</button>
        <button onClick={() => setShowDetails(true)}><i className='fa fa-info'/>  Details</button>
      </div>
      </div>
     
    </>
  );
}

export default PuppyCard
