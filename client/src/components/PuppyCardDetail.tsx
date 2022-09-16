import React from 'react'
import { Puppy } from '../interfaces'

interface Props {
  puppy: Puppy,
  changeDetailedPuppyId: Function
}

function PuppyCardDetail({ puppy, changeDetailedPuppyId }: Props) {
  const { name, id, bday, breed, image } = puppy
  
  return(
    <div className='puppyCardDetail'>
      <div className='puppyCardDetail_block'>
        <p>Id: {id}</p>
        <p>Name: {name}</p>
        <p>BirthDay: {bday}</p>
        <p>Breed: {breed}</p>
        {image&&<img src={image} alt={`Image for ${breed}`}></img>}
        <button onClick={() => changeDetailedPuppyId(null)} style={{margin:'15px'}}>X</button>
      </div>
    </div>
  )
}

export default PuppyCardDetail
