import React from 'react'
import { Puppy } from '../interfaces'

interface Props {
  puppy: Puppy,
  closeDetails: Function
}

function PuppyCardDetail({ puppy, closeDetails }: Props) {
  const { name, id, bday, breed, image } = puppy
  
  return(
    <div className='puppyCardDetail'>
      <button className='button_delete' onClick={() => closeDetails() }>X</button>
      <p>PuppyID: {id}</p>
      <p>Name: {name}</p>
      <p>BirthDay: {bday}</p>
      <p>Breed: {breed}</p>
      {image&&<img src={image} alt={`Image for ${breed}`}></img>}
    </div>
  )
}

export default PuppyCardDetail
