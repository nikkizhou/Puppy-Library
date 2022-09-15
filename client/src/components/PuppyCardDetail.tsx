import React from 'react'
import { Puppy } from '../interfaces'
interface Props {
  puppy: Puppy,
  changePuppyId: Function
}


function PuppyCardDetail({ puppy, changePuppyId }: Props) {
  const { name, id, bday, breed } = puppy

  return(
    <div className='puppyCardDetail'>
      <p>Id: {id}</p>
      <p>Name: {name}</p>
      <p>BirthDay: {bday}</p>
      <p>Breed: {breed}</p>
      <button onClick={() => changePuppyId(null)}>X</button>
    </div>
  )
}

export default PuppyCardDetail
